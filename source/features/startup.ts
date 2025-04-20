import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import { GUILDS_CHECKING } from "../utility/configuration.js";

export async function startup() {
	for (const guild of GUILD_CACHE.values()) {
		if (!GUILDS_CHECKING.includes(guild.id)) {
			// We should not be in this guild.
			await client.api.users.leaveGuild(guild.id);
		}

		const requestGuildMembersResponse = await client.requestGuildMembers({
			guild_id: guild.id,
			limit: 0,
			query: "",
		});

		for (const member of requestGuildMembersResponse.members) {
			guild.members.set(member.user.id, member);
		}
	}
}
