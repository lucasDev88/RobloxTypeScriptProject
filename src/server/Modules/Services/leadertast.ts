import { GameModule } from "shared/Types/GameModule";
import { Players } from "@rbxts/services";

const leaderstats: GameModule = {
	Name: "Leaderstats",

	Init() {
		Players.PlayerAdded.Connect((player: Player): void => {
			const folder = new Instance("Folder");
			folder.Name = "leaderstats";
			folder.Parent = player;

			const coins = new Instance("IntValue", folder);
			coins.Name = "Coins";
			coins.Value = 0;

			const gems = new Instance("IntValue", folder);
			gems.Name = "Gems";
			gems.Value = 0;
		});
	},
};

export default leaderstats;
