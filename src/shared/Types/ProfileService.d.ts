declare module "server/ServerPackages/ProfileService" {
	export interface Profile<Data = unknown> {
		Data: Data;
		Reconcile(): void;
		Release(): void;
		AddUserId(userId: number): void;
		ListenToRelease(callback: () => void): void;
	}

	interface ProfileStore<Data = unknown> {
		LoadProfileAsync(key: string): Profile<Data> | undefined;
	}

	interface ProfileService {
		GetProfileStore<Data>(name: string, template: Data): ProfileStore<Data>;
	}

	const ProfileService: ProfileService;
	export default ProfileService;
}
