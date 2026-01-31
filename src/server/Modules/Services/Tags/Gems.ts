import { TagHandler } from "../../../../shared/Types/TagHandler";
import { Players } from "@rbxts/services";

const Gems: TagHandler = {
	Tag: "Gems",

	Init(instance) {
		if (!instance.IsA("BasePart")) return;

		let collected = false;

		instance.Touched.Connect((hit) => {
			if (collected) return;

			const character = hit.Parent;
			if (!character || !character.IsA("Model")) return;

			const humanoid = character.FindFirstChildOfClass("Humanoid");
			if (!humanoid) return;

			const player = Players.GetPlayerFromCharacter(character);
			if (!player) return;

			const leaderstats = player.FindFirstChild("leaderstats");
			const gems = leaderstats?.FindFirstChild("Gems");

			if (gems && gems.IsA("IntValue")) {
				collected = true;
				gems.Value += 1;

				instance.Destroy();
			}
		});
	},
};

export default Gems;
