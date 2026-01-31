import DataService from "./Services/DataService";
import Leaderstats from "./Services/Leaderstasts";
import TagHandler from "./Services/TagHandler";
import { GameModule } from "../../shared/Types/GameModule";

const ServerModules: GameModule[] = [Leaderstats, TagHandler, DataService];

export default ServerModules;
