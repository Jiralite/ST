import {
	Client,
	GatewayIntentBits,
	PresenceUpdateStatus,
} from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import { DISCORD_TOKEN } from "./utility/configuration.js";

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

export const gateway = new WebSocketManager({
	intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMembers,
	rest,
	token: DISCORD_TOKEN,
	initialPresence: {
		since: null,
		activities: [],
		status: PresenceUpdateStatus.Invisible,
		afk: false,
	},
});

export const client = new Client({ rest, gateway });
