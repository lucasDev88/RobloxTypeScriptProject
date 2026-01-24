import leaderstats from "./Services/leadertast";
import TagHandler from "./Services/TagHandler";
import { GameModule } from "shared/Types/GameModule";

const ServerModules: GameModule[] = [leaderstats, TagHandler];

export default ServerModules;
