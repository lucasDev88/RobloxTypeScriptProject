import { TagHandler } from "shared/Types/TagHandler";
import { ServerStorage, Workspace } from "@rbxts/services";

const GemsSpawn: TagHandler = {
	Tag: "GemsSpawn",
	Init(instance) {
		if (!instance.IsA("BasePart")) return warn("GemsSpawn tag colocada em algo que não é base part.");

		print("Spawn de gemas inicado em:", instance.GetFullName());

		const gemTemplate = ServerStorage.FindFirstChild("Assets")?.FindFirstChild("Gem");

		if (!gemTemplate || !gemTemplate.IsA("BasePart"))
			return warn("Coloque uma Part chamada 'Gem' no ServerStorage");

		const RADIUS = 50;
		const MAX_GEMS = 30;

		task.spawn(() => {
			while (instance.Parent) {
				const gems = Workspace.FindFirstChild("Gems")
					?.GetChildren()
					.filter((obj) => obj.Name === "Gem");

				if (!gems) return;

				if (gems.size() >= MAX_GEMS) {
					task.wait(2);
					continue;
				}

				const ANGLE: number = math.random() * math.pi * 2;
				const DISTANCE: number = math.random() * RADIUS;

				const OFFSET: Vector3 = new Vector3(math.cos(ANGLE) * DISTANCE, 1, math.sin(ANGLE) * DISTANCE);

				const gem = gemTemplate.Clone();
				gem.CFrame = instance.CFrame.add(OFFSET);
				gem.Parent = Workspace.FindFirstChild("Gems");

				task.wait(10);
			}
		});
	},
};

export default GemsSpawn;
