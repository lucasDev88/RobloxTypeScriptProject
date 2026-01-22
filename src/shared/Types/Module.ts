export interface GameModule {
	Name: string;
	Priotity?: number;
	Init(): void;
	Start?: void;
}
