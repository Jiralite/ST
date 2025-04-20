import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildMemberRemove;

export default {
	name,
	fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			console.warn({ data }, `Received a ${name} packet on an uncached guild.`);
			return;
		}

		guild.members.delete(data.user.id);
	},
} satisfies Event<typeof name>;
