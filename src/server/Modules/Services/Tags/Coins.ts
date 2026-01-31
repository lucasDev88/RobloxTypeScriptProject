import { TagHandler } from "../../../../shared/Types/TagHandler";
import { Players } from "@rbxts/services";

const Coins: TagHandler = {
	Tag: "Coins",

	Init(instance) {
		if (!instance.IsA("BasePart")) return;

		let collected = false; // 🔒 trava

		instance.Touched.Connect((hit) => {
			if (collected) return;

			const character = hit.Parent;
			if (!character || !character.IsA("Model")) return;

			const humanoid = character.FindFirstChildOfClass("Humanoid");
			if (!humanoid) return;

			const player = Players.GetPlayerFromCharacter(character);
			if (!player) return;

			const leaderstats = player.FindFirstChild("leaderstats");
			const coins = leaderstats?.FindFirstChild("Coins");

			if (coins && coins.IsA("IntValue")) {
				collected = true; // 🔒 impede múltiplas execuções
				coins.Value += 10;

				instance.Destroy();
			}
		});
	},
};

export default Coins;
