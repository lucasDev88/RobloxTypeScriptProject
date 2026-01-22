import { GameModule } from "shared/Types/GameModule";
import { Players, UserInputService } from "@rbxts/services";

const Test: GameModule = {
	Name: "Test",
	Priority: 1,
	Init() {
		const player: Player = Players.LocalPlayer;
		const Character: Model = player.Character ?? player.CharacterAdded.Wait()[0];
		const Humanoid = Character.FindFirstChildOfClass("Humanoid");

		if (!player || !Character || !Humanoid) return;

		UserInputService.InputBegan.Connect((input, gameProcessedEvent) => {
			// eslint-disable-next-line roblox-ts/lua-truthiness
			if (gameProcessedEvent) return;

			if (input.KeyCode === Enum.KeyCode.LeftControl || input.KeyCode === Enum.KeyCode.RightControl) {
				Humanoid.WalkSpeed = 30;
			}
		});

		UserInputService.InputEnded.Connect((input, gameProcessedEvent) => {
			// eslint-disable-next-line roblox-ts/lua-truthiness
			if (gameProcessedEvent) return;

			if (input.KeyCode === Enum.KeyCode.LeftControl || input.KeyCode === Enum.KeyCode.RightControl) {
				Humanoid.WalkSpeed = 16;
			}
		});
	},
};

export default Test;
