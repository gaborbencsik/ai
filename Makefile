SBX_NAME := ai-skills

# Source of truth for the kit spec: pulled fresh from the repo on each build.
REPO     := gaborbencsik/ai
SPEC     := sbx-spec.yaml
# Local, gitignored kit dir the create command points at. Holds the built
# spec WITH the API key injected — never commit it.
KIT_DIR  := .kit

.PHONY: help sbx-create sbx-run sbx-rm

help:
	@echo "Available commands:"
	@echo ""
	@echo "    make sbx-create   Download spec + inject API key, then create the sbx environment"
	@echo "    make sbx-run      Start the sbx environment"
	@echo "    make sbx-rm       Remove the sbx environment"

# Download the spec from the repo and inject the API key (scripts/kit-build-claude.sh),
# then create the sandbox from the built kit dir.
sbx-create:
	@REPO=$(REPO) SPEC=$(SPEC) KIT_DIR=$(KIT_DIR) ./scripts/kit-build-claude.sh
	sbx create --name $(SBX_NAME) --kit $(KIT_DIR) claude .

sbx-run:
	sbx run --name $(SBX_NAME)

sbx-rm:
	sbx rm $(SBX_NAME)
