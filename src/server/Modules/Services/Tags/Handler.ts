import Coins from "./Coins";
import CoinsSpawn from "./CoinsSpawn";
import { TagHandler } from "shared/Types/TagHandler";
import GemsSpawn from "./GemsSpawn";
import Gems from "./Gems";

export const TagHandlers: ReadonlyArray<TagHandler> = [Coins, CoinsSpawn, GemsSpawn, Gems];
