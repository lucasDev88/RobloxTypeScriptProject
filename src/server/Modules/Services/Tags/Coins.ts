import { TagHandler } from "shared/Types/TagHandler";
import { Players } from "@rbxts/services";

const Coins: TagHandler = {
	Tag: "Coins",
	Init(instance) {
		if (instance.IsA("BasePart")) {
			print("vei no handler");
			instance.Touched.Connect((hit) => {
				print("encostou");
				if (hit.Parent?.IsA("Model") && hit.Parent.FindFirstChildOfClass("Humanoid")) {
					const Player = Players.GetPlayerFromCharacter(hit.Parent);
					const leaderstats = Player?.WaitForChild("leaderstats");

					if (!Player) return print("num tem player");
					if (!leaderstats) return print("Não tem leaderstats");

					const Coins = leaderstats.WaitForChild("Coins");

					if (!Coins) return print("não tem coins");

					if (Coins.IsA("IntValue")) {
						print("Chegou paizao");
						Coins.Value += 1;
						instance.Destroy();
					}
				} else return print("n sei mais");
			});
		} else return print("num chegô f");
	},
};

export default Coins;
