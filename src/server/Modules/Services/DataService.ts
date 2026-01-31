import ProfileService, { Profile } from "../../ServerPackages/ProfileService";
import { Players } from "@rbxts/services";
import { GameModule } from "../../../shared/Types/GameModule";
import { PlayerData } from "../../../shared/Types/PlayerData";

const ProfileStore = ProfileService.GetProfileStore(
	"PlayerData_V1", // muda versão quando resetar dados
	{
		Coins: 0,
	} as PlayerData,
);

const Profiles = new Map<Player, Profile<PlayerData>>();

const DataService: GameModule = {
	Name: "DataService",
	Priority: 0, // carrega antes de leaderstats

	Init() {
		Players.PlayerAdded.Connect((player) => {
			print("📦 DataService iniciou");

			const profile = ProfileStore.LoadProfileAsync("Player_" + player.UserId);

			if (!profile) {
				player.Kick("Erro ao carregar dados.");
				return;
			}

			profile.AddUserId(player.UserId);
			profile.Reconcile();

			profile.ListenToRelease(() => {
				Profiles.delete(player);
				player.Kick("Dados carregados em outro servidor.");
			});

			if (player.IsDescendantOf(Players)) {
				Profiles.set(player, profile);
				print("📁 Dados carregados:", player.Name);
			} else {
				profile.Release();
			}
		});

		Players.PlayerRemoving.Connect((player) => {
			const profile = Profiles.get(player);
			if (profile) {
				profile.Release();
			}
		});
	},
};

export default DataService;
export { Profiles };
