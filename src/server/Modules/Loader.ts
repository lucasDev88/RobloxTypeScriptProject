import { GameModule } from "shared/Types/GameModule";
import ServerModules from "./ModulesServer";

export default class ModuleLoader {
	static Load() {
		const modules = [...ServerModules];

		modules.sort((a: GameModule, b: GameModule): boolean => {
			return (a.Priority ?? 100) < (b.Priority ?? 100);
		});

		for (const mod of modules) {
			mod.Init();
		}

		for (const mod of modules) {
			mod.Start?.();
		}

		print("Modulos do servidor carregados com sucesso");
	}
}
