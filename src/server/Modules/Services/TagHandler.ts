import { GameModule } from "shared/Types/GameModule";
import { CollectionService, Players } from "@rbxts/services";
import { TagHandlers } from "./Tags/Handler";

const TagHandlerModule: GameModule = {
	Name: "TagHandler",
	Priority: 1,

	Init() {
		// Marca players
		Players.PlayerAdded.Connect((player) => {
			CollectionService.AddTag(player, "Player");
		});

		// Liga todos os handlers
		for (const handler of TagHandlers) {
			// Para quem já tem a tag
			for (const inst of CollectionService.GetTagged(handler.Tag)) {
				handler.Init(inst);
			}

			// Para novas instâncias com a tag
			print("Veio");
			CollectionService.GetInstanceAddedSignal(handler.Tag).Connect((inst) => handler.Init(inst));
		}
	},
};

export default TagHandlerModule;
