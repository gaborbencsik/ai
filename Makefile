SBX_NAME := ai-skills

# Source of truth for the kit spec: pulled fresh from the repo on each build.
REPO     := gaborbencsik/ai
SPEC     := sbx-spec.yaml
# Local, gitignored kit dir the create command points at. Holds the built
# spec WITH the API key injected -- never commit it.
KIT_DIR  := .kit
# Build script that downloads the spec + injects the API key. Auto-fetched
# from the repo if missing (see sbx-create).
SCRIPT   := scripts/kit-build-claude.sh

.PHONY: help sbx-create sbx-create-local sbx-run sbx-rm

help:
	@echo "Available commands:"
	@echo ""
	@echo "    make sbx-create         Download spec + script from the repo, inject API key, create the sbx environment"
	@echo "    make sbx-create-local   Same, but use the local working-tree script + spec (no download; for testing)"
	@echo "    make sbx-run            Start the sbx environment"
	@echo "    make sbx-rm             Remove the sbx environment"

# Always download the latest build script from the repo so every run uses a
# fresh copy, then run it (downloads the spec + injects the API key) and create
# the sandbox from the built kit dir.
sbx-create:
	@echo "Downloading latest $(SCRIPT) from $(REPO)..."
	@mkdir -p $(dir $(SCRIPT))
	@gh api "repos/$(REPO)/contents/$(SCRIPT)" -H "Accept: application/vnd.github.raw" > $(SCRIPT)
	@chmod +x $(SCRIPT)
	@REPO=$(REPO) SPEC=$(SPEC) KIT_DIR=$(KIT_DIR) ./$(SCRIPT)
	sbx create --name $(SBX_NAME) --kit $(KIT_DIR) claude .

# Build from the local working tree (no download): uses this repo's own
# scripts/kit-build-claude.sh and sbx-spec.yaml so you can test uncommitted
# changes before pushing. LOCAL_SPEC tells the script to copy the local spec
# instead of fetching it.
sbx-create-local:
	@LOCAL_SPEC=$(SPEC) KIT_DIR=$(KIT_DIR) ./$(SCRIPT)
	sbx create --name $(SBX_NAME) --kit $(KIT_DIR) claude .

sbx-run:
	sbx run --name $(SBX_NAME)

sbx-rm:
	sbx rm $(SBX_NAME)
