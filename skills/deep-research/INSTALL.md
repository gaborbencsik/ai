# Installation & Setup Guide

## Quick Start (3 steps)

### 1. Clone into OMP Extensions

```bash
# User extensions (global, all projects)
git clone https://github.com/your-org/omp-deep-research.git \
  ~/.omp/agent/extensions/deep-research

# OR project-local (this project only)
git clone https://github.com/your-org/omp-deep-research.git \
  .omp/extensions/deep-research
```

### 2. Verify Installation

Restart OMP, then check:

```bash
omp --info  # should list "deep-research" extension

# or in OMP session:
/skill:deep-research  # displays SKILL.md
```

### 3. Run a Test Research

```
/research in quick: what is machine learning
```

Expected output: research report injected into chat within 2–5 minutes.

---

## Installation Methods

### Method A: Manual Clone (Recommended for Development)

```bash
# User-global
git clone <repo-url> ~/.omp/agent/extensions/deep-research

# Project-local
git clone <repo-url> .omp/extensions/deep-research

# Watch for changes during dev (optional)
cd ~/.omp/agent/extensions/deep-research
git pull origin main
```

**Pros**: Direct git control, easy to update  
**Cons**: Manual sync

### Method B: npm Plugin (Recommended for Distribution)

1. **Publish to npm**:
   ```bash
   npm publish --access public
   ```

2. **Install via OMP plugin manager**:
   ```bash
   omp plugin install @your-org/omp-deep-research
   ```

3. **Auto-discovered**: Extension loads from `~/.omp/plugins/node_modules/`

**Pros**: One-command install, auto-updates  
**Cons**: Requires npm account

### Method C: Symlink (Development Only)

```bash
# In repo root
ln -s $(pwd) ~/.omp/agent/extensions/deep-research

# Reload OMP to pick up changes
# or in OMP: /skill:deep-research to re-read
```

**Pros**: Changes reflected immediately  
**Cons**: Breaks if repo moves

### Method D: Configured Paths

Edit `~/.omp/agent/config.yml`:

```yaml
extensions:
  - /absolute/path/to/deep-research
  - ~/relative/path/to/deep-research
```

Then restart OMP.

---

## Post-Installation Setup

### 1. Verify OMP Version

Deep-research requires OMP 1.0+ with:
- `web_search` tool ✓
- `agent()` API ✓
- Extension support ✓

```bash
omp --version

# Expected: oh-my-pi/1.0+ or pi-coding-agent/1.0+
```

### 2. Check Web Search Configuration

Research relies on `web_search`. Verify it's working:

```
# In OMP session
web_search("your test query here")
```

If fails:
- Ensure `web_search` is in enabled tools: `omp --tools` should list it
- Check provider config: `~/.omp/agent/config.yml#web_search`

### 3. (Optional) Configure Cache Directory

```bash
export DEEP_RESEARCH_CACHE_DIR="~/.research-cache"
mkdir -p ~/.research-cache
```

or in config:

```yaml
deepResearch:
  cachePath: ~/.research-cache
  maxSourcesPerMode:
    quick: 5
    standard: 10
    deep: 15
    ultradeep: 20
```

### 4. (Optional) Enable Debug Logging

```yaml
# ~/.omp/agent/config.yml
logging:
  level: debug
```

View logs:

```bash
tail -f ~/.omp/logs/omp.$(date +%F).*.log | grep -i research
```

---

## Troubleshooting

### Extension Not Discovered

**Symptom**: `/research` command not found, `skill:deep-research` 404

**Checks**:

1. File exists and named correctly:
   ```bash
   ls -la ~/.omp/agent/extensions/deep-research/
   # Should show: index.ts, SKILL.md, package.json, README.md
   ```

2. Check discovery logs:
   ```bash
   tail -f ~/.omp/logs/omp.$(date +%F).*.log | grep -i extension
   ```

3. Verify no parse errors in TypeScript:
   ```bash
   # OMP will load .ts directly, but check syntax
   cat ~/.omp/agent/extensions/deep-research/index.ts | head -20
   ```

4. Check disabledExtensions:
   ```bash
   grep -A 5 disabledExtensions ~/.omp/agent/config.yml
   ```

### web_search Tool Not Available

**Symptom**: "web_search is not available" error during research

**Checks**:

1. Enable search tool:
   ```bash
   omp --tools web_search
   ```

2. Check provider config:
   ```bash
   cat ~/.omp/agent/config.yml | grep -A 10 web_search
   ```

3. Fallback: use manual searches, report issue on GitHub

### Research Hangs / Times Out

**Symptom**: `/research` command starts but no output after 10+ minutes

**Checks**:

1. Check running agents:
   ```bash
   # In OMP, press Ctrl+K then type: /info
   # or: hub(op: "jobs") in eval
   ```

2. Increase timeout:
   ```bash
   export DEEP_RESEARCH_TIMEOUT_SECONDS=600  # 10 min
   ```

3. Try smaller research scope:
   ```
   /research in quick: simpler question
   ```

4. Check logs for errors:
   ```bash
   grep -i error ~/.omp/logs/omp.$(date +%F).*.log | tail -20
   ```

### Extension Load Error

**Symptom**: "Failed to load extension: deep-research"

**Checks**:

1. TypeScript syntax error:
   ```bash
   cat ~/.omp/agent/extensions/deep-research/index.ts | npx ts-node --transpileOnly /dev/stdin
   ```

2. Missing dependencies:
   ```bash
   npm ls @oh-my-pi/pi-coding-agent
   # Should be installed with OMP
   ```

3. Permission issue:
   ```bash
   chmod -R 755 ~/.omp/agent/extensions/deep-research
   ```

4. Check manifest (if npm plugin):
   ```bash
   cat ~/.omp/agent/extensions/deep-research/package.json | grep -A 5 '"omp"'
   ```

### Cache Write Failed

**Symptom**: "research complete" but no `.omp/research-cache-*.json`

**Checks**:

1. Directory permissions:
   ```bash
   ls -ld .omp/
   # Should be: drwx------ or drwxr-xr-x
   ```

2. Disk space:
   ```bash
   df -h | grep -E "^/dev|^/Volumes|^D:"
   ```

3. SELinux (Linux):
   ```bash
   getenforce  # should be Permissive or Disabled for dev
   ```

---

## Uninstallation

### Method A: Manual Clone

```bash
rm -rf ~/.omp/agent/extensions/deep-research
# or
rm -rf .omp/extensions/deep-research
```

### Method B: npm Plugin

```bash
omp plugin uninstall @your-org/omp-deep-research
# or
npm uninstall -g @your-org/omp-deep-research
```

### Method C: Disable Only (Keep Files)

Edit `~/.omp/agent/config.yml`:

```yaml
disabledExtensions:
  - extension-module:deep-research
```

---

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Test Deep Research Extension

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install OMP
        run: npm install -g oh-my-pi
      
      - name: Install extension
        run: |
          mkdir -p ~/.omp/agent/extensions
          ln -s $(pwd) ~/.omp/agent/extensions/deep-research
      
      - name: Test TypeScript
        run: npx tsc --noEmit
      
      - name: Run unit tests
        run: npm test  # if applicable
```

### Docker Example

```dockerfile
FROM node:18-alpine

RUN npm install -g oh-my-pi

WORKDIR /opt/extensions
COPY . /opt/extensions/deep-research

RUN mkdir -p ~/.omp/agent/extensions && \
    ln -s /opt/extensions/deep-research ~/.omp/agent/extensions/

ENTRYPOINT ["omp"]
```

---

## Next Steps

1. **Read SKILL.md** for usage overview
2. **Try examples** in README.md
3. **Customize** following ADVANCED.md patterns
4. **Contribute** improvements via GitHub issues/PRs

---

**Support**: 
- GitHub Issues: https://github.com/your-org/omp-deep-research/issues
- Discussions: https://github.com/your-org/omp-deep-research/discussions
- OMP Docs: https://docs.oh-my-pi.dev/
