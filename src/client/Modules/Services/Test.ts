import { GameModule } from "shared/Types/GameModule";

const Test: GameModule = {
	Name: "Test",
	Priority: 1,
	Init() {
		print("foi no client");
	},
};

export default Test;
