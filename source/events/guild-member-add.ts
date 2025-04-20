import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { GuildMember } from "../models/discord/guild-member.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildMemberAdd;

export default {
	name,
	fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			console.warn({ data }, `Received a ${name} packet on an uncached guild.`);
			return;
		}

		guild.members.set(data.user.id, new GuildMember(data));
	},
} satisfies Event<typeof name>;
