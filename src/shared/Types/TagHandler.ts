export interface TagHandler {
	Tag: string;
	Init(instance: Instance): void | string;
}
