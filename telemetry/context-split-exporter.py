#!/usr/bin/env python3
# context-split-exporter: reconstruct the /context-style input-token split
# (system prompt / conversation messages / tool definitions) that Claude Code's
# OTEL telemetry does NOT expose, and push it to the OTLP collector as a metric.
#
# Source of truth: OTEL_LOG_RAW_API_BODIES=file:<dir> writes one untruncated
# <uuid>.request.json per API request, containing the raw Messages API params.
# We measure the three top-level sections, emit a cumulative counter, and delete
# the file (dedup + bounded disk + bounded prompt-content residency).
#
# Stdlib only (json/urllib/os/time/glob) so it needs no install step.
# The section token counts are a local char/4 heuristic — the RATIO between
# sections is the signal, and that is robust to the absolute estimate error.
import glob
import json
import os
import sys
import time
import urllib.request

POLL_SECONDS = 5
SCOPE_NAME = "context-split-exporter"
METRIC_NAME = "claude_code.context_section_tokens_total"
SECTIONS = ("system", "messages", "tools")


def log(msg):
    print("[context-split] %s" % msg, flush=True)


def body_dir():
    raw = os.environ.get("OTEL_LOG_RAW_API_BODIES", "")
    if raw.startswith("file:"):
        return raw[len("file:"):]
    return ""


def metrics_url():
    ep = os.environ.get("OTEL_EXPORTER_OTLP_ENDPOINT", "").rstrip("/")
    return ep + "/v1/metrics" if ep else ""


def resource_attrs():
    # OTEL_RESOURCE_ATTRIBUTES is "k1=v1,k2=v2" (project/sandbox stamped at build).
    out = []
    raw = os.environ.get("OTEL_RESOURCE_ATTRIBUTES", "")
    for pair in raw.split(","):
        pair = pair.strip()
        if "=" in pair:
            k, v = pair.split("=", 1)
            if k:
                out.append(kv(k.strip(), v.strip()))
    return out


def kv(k, v):
    return {"key": k, "value": {"stringValue": str(v)}}


def est_tokens(obj):
    # char/4 heuristic; empty/absent section -> 0.
    if not obj:
        return 0
    try:
        return len(json.dumps(obj, ensure_ascii=False)) // 4
    except (TypeError, ValueError):
        return 0


def measure(path):
    with open(path, "r", encoding="utf-8") as fh:
        body = json.load(fh)
    model = body.get("model") or "unknown"
    return model, {
        "system": est_tokens(body.get("system")),
        "messages": est_tokens(body.get("messages")),
        "tools": est_tokens(body.get("tools")),
    }


def build_payload(cumulative, res_attrs, start_ns):
    now = str(time.time_ns())
    dps = []
    for (section, model), total in cumulative.items():
        dps.append({
            "asInt": str(total),
            "startTimeUnixNano": str(start_ns),
            "timeUnixNano": now,
            "attributes": [kv("section", section), kv("model", model)],
        })
    return {
        "resourceMetrics": [{
            "resource": {"attributes": res_attrs},
            "scopeMetrics": [{
                "scope": {"name": SCOPE_NAME},
                "metrics": [{
                    "name": METRIC_NAME,
                    "unit": "{token}",
                    "description": "Estimated input tokens per prompt section",
                    "sum": {
                        "dataPoints": dps,
                        "aggregationTemporality": 2,  # CUMULATIVE
                        "isMonotonic": True,
                    },
                }],
            }],
        }],
    }


def post(url, payload):
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url, data=data, headers={"Content-Type": "application/json"}, method="POST"
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        return resp.status


def main():
    d = body_dir()
    url = metrics_url()
    if not d or not url:
        log("OTEL_LOG_RAW_API_BODIES (file:) or OTEL_EXPORTER_OTLP_ENDPOINT unset; exiting")
        return 0
    os.makedirs(d, exist_ok=True)
    res_attrs = resource_attrs()
    start_ns = time.time_ns()
    cumulative = {}  # (section, model) -> running total
    log("watching %s -> %s" % (d, url))
    while True:
        try:
            files = sorted(glob.glob(os.path.join(d, "*.request.json")), key=os.path.getmtime)
        except OSError:
            files = []
        changed = False
        for path in files:
            try:
                model, sizes = measure(path)
            except Exception as e:  # noqa: BLE001 - never let one bad file kill the loop
                log("bad file %s: %s" % (path, e))
                try:
                    os.rename(path, path + ".bad")
                except OSError:
                    pass
                continue
            for section in SECTIONS:
                key = (section, model)
                cumulative[key] = cumulative.get(key, 0) + sizes[section]
            changed = True
            try:
                os.remove(path)
            except OSError:
                pass
        if changed:
            try:
                status = post(url, build_payload(cumulative, res_attrs, start_ns))
                if status >= 300:
                    log("collector returned HTTP %s" % status)
            except Exception as e:  # noqa: BLE001
                log("post failed: %s" % e)
        time.sleep(POLL_SECONDS)


if __name__ == "__main__":
    sys.exit(main())
