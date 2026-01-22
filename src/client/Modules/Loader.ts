import ClientModules from "./ClientModules";
import { GameModule } from "shared/Types/GameModule";

export default class ModuleLoader {
	static Load() {
		const modules = [...ClientModules];

		modules.sort((a: GameModule, b: GameModule): boolean => {
			return (a.Priority ?? 100) < (b.Priority ?? 100);
		});

		for (const mod of modules) {
			mod.Init();
		}

		for (const mod of modules) {
			mod.Start?.();
		}

		print("Modulos do client carregados com sucesso");
	}
}
