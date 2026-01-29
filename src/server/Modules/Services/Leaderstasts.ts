import { Players } from "@rbxts/services";
import { Profiles } from "./DataService";
import { GameModule } from "shared/Types/GameModule";

const Leaderstats: GameModule = {
	Name: "Leaderstats",
	Priority: 2,

	Init() {
		Players.PlayerAdded.Connect((player) => {
			const leaderstats = new Instance("Folder");
			leaderstats.Name = "leaderstats";
			leaderstats.Parent = player;

			const coins = new Instance("IntValue");
			coins.Name = "Coins";
			coins.Parent = leaderstats;

			// Espera o profile carregar
			task.spawn(() => {
				while (!Profiles.has(player)) task.wait();

				const profile = Profiles.get(player)!;
				coins.Value = profile.Data.Coins;

				// Atualiza dado quando mudar
				coins.Changed.Connect((value) => {
					profile.Data.Coins = value;
				});
			});
		});
	},
};

export default Leaderstats;
