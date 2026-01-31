import { TagHandler } from "../../../../shared/Types/TagHandler";
import { ServerStorage, Workspace } from "@rbxts/services";

const CoinsSpawn: TagHandler = {
	Tag: "CoinsSpawn",
	Init(instance) {
		if (!instance.IsA("BasePart")) {
			warn("CoinsSpawn tag colocada em algo que não é BasePart");
			return;
		}

		print("Spawn de moedas iniciado em:", instance.GetFullName());

		const coinTemplate = ServerStorage.FindFirstChild("Assets")?.FindFirstChild("Coin");
		if (!coinTemplate || !coinTemplate.IsA("BasePart")) {
			warn("❌ Coloque uma Part chamada 'Coin' no ServerStorage");
			return;
		}

		const radius = 50;

		const MAX_COINS = 30;

		task.spawn(() => {
			while (instance.Parent) {
				const coins = Workspace.FindFirstChild("Coins")
					?.GetChildren()
					.filter((obj) => obj.Name === "Coin");

				if (!coins) return;

				if (coins.size() >= MAX_COINS) {
					task.wait(2);
					continue;
				}

				const angle = math.random() * math.pi * 2;
				const distance = math.random() * radius;

				const offset = new Vector3(math.cos(angle) * distance, 1, math.sin(angle) * distance);

				const coin = coinTemplate.Clone();
				coin.CFrame = instance.CFrame.add(offset);
				coin.Parent = Workspace.FindFirstChild("Coins");

				task.wait(2);
			}
		});
	},
};

export default CoinsSpawn;
