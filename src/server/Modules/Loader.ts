import { GameModule } from "../../shared/Types/GameModule";
import ServerModules from "./ModulesServer";

export default class ModuleLoader {
	static Load() {
		const modules = ServerModules as GameModule[];

		modules.sort((a, b) => {
			return (a.Priority ?? 100) < (b.Priority ?? 100);
		});

		for (const mod of modules) {
			const [success, err] = pcall(() => {
				print(`🔧 Init módulo: ${mod.Name}`);
				mod.Init?.();
			});

			if (!success) {
				warn(`❌ Erro no Init do módulo ${mod.Name}:`, err);
			}
		}

		for (const mod of modules) {
			const [success, err] = pcall(() => {
				print(`🚀 Start módulo: ${mod.Name}`);
				mod.Start?.();
			});

			if (!success) {
				warn(`❌ Erro no Start do módulo ${mod.Name}:`, err);
			}
		}

		print("Modulos do servidor carregados com sucesso");
	}
}
