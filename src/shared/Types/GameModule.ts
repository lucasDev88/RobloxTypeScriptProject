export interface GameModule {
	Name: string;
	Priority?: number;
	Init(): void;
	Start?: () => void;
}
