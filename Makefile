SBX_NAME := ai-skills

.PHONY: help sbx-create sbx-run sbx-rm

help:
	@echo "Elérhető parancsok:"
	@echo ""
	@echo "    make sbx-create     Sbx környezet létrehozása"
	@echo "    make sbx-run        Sbx környezet indítása"
	@echo "    make sbx-rm         Sbx környezet törlése"

sbx-create:
	sbx create --name $(SBX_NAME) --kit ~/kits/my-kit claude .

sbx-run:
	sbx run $(SBX_NAME)

sbx-rm:
	sbx rm $(SBX_NAME)
