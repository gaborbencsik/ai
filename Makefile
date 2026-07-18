# read -s (silent key prompt) needs bash, not /bin/sh.
SHELL := bash

SBX_NAME := ai-skills

# Source of truth for the kit spec: pulled fresh from the repo on each build.
REPO     := gaborbencsik/ai
SPEC     := sbx-spec.yaml
# Local, gitignored kit dir the create command points at. Holds the built
# spec WITH the API key injected — never commit it.
KIT_DIR  := .kit
KIT_SPEC := $(KIT_DIR)/$(SPEC)

.PHONY: help kit-build sbx-create sbx-run sbx-rm

help:
	@echo "Elérhető parancsok:"
	@echo ""
	@echo "    make kit-build      sbx-spec.yaml letöltése a repóból + API kulcs beszúrása"
	@echo "    make sbx-create     Sbx környezet létrehozása (előbb kit-build fut)"
	@echo "    make sbx-run        Sbx környezet indítása"
	@echo "    make sbx-rm         Sbx környezet törlése"

# Download the spec from the repo, then prompt for and inject the API key.
kit-build:
	@mkdir -p $(KIT_DIR)
	@echo "Letöltés: $(SPEC) ← $(REPO)…"
	@gh api repos/$(REPO)/contents/$(SPEC) \
		-H "Accept: application/vnd.github.raw" > $(KIT_SPEC)
	@read -rsp "ANTHROPIC_API_KEY: " API_KEY; echo; \
	 if [ -z "$$API_KEY" ]; then echo "Nem adtál meg kulcsot, kilépek." >&2; exit 1; fi; \
	 awk -v key="$$API_KEY" \
		'/^[[:space:]]*ANTHROPIC_API_KEY:/ { match($$0, /^[[:space:]]*/); print substr($$0, 1, RLENGTH) "ANTHROPIC_API_KEY: \"" key "\""; next } { print }' \
		$(KIT_SPEC) > $(KIT_SPEC).tmp && mv $(KIT_SPEC).tmp $(KIT_SPEC)
	@echo "Kész: kulcs beszúrva → $(KIT_SPEC)"

sbx-create: kit-build
	sbx create --name $(SBX_NAME) --kit $(KIT_DIR) claude .

sbx-run:
	sbx run --name $(SBX_NAME)

sbx-rm:
	sbx rm $(SBX_NAME)
