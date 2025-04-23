import type { Snowflake } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import {
	GUILD_7,
	GUILD_7_CONTACT_ID,
	ILLUMINATI_GUILD_ID,
} from "../utility/configuration.js";

export async function check(userId: Snowflake) {
	const matchedGuilds = [];
	const unavailableGuilds = [];

	for (const guild of GUILD_CACHE.values()) {
		if (guild.id === ILLUMINATI_GUILD_ID) {
			continue;
		}

		if (guild.unavailable) {
			unavailableGuilds.push(guild);
			continue;
		}

		const requestGuildMembersResult = await client.requestGuildMembers({
			guild_id: guild.id,
			user_ids: [userId],
		});

		if (requestGuildMembersResult.members[0]) {
			matchedGuilds.push(guild);
		}
	}

	let response = "";

	if (unavailableGuilds.length > 0) {
		response += `The following guilds are unavailable: \n${unavailableGuilds.map((guild) => `- ${guild.name} (\`${guild.id}\`)`).join("\n")}\n\n`;
	}

	if (matchedGuilds.length === 0) {
		response += `<@${userId}> not found.`;
	} else {
		matchedGuilds.sort((a, b) => {
			if (a.profile === null) {
				return 1;
			}

			if (b.profile === null) {
				return -1;
			}

			return a.profile.tag.localeCompare(b.profile.tag);
		});

		const guildsText =
			matchedGuilds.length === 1
				? "Found 1 guild"
				: `Found ${matchedGuilds.length} guilds`;

		response += `${guildsText} for <@${userId}> (\`${userId}\`):\n${matchedGuilds
			.map((matchedGuild) => {
				let string = "- ";

				if (matchedGuild.profile?.tag) {
					string += `\`[${matchedGuild.profile.tag}]\` `;
				}

				string += `${matchedGuild.name} `;

				if (matchedGuild.id === GUILD_7) {
					string += `<@${GUILD_7_CONTACT_ID}>`;
				} else {
					string += `<@${matchedGuild.ownerId}>`;
				}

				return string;
			})
			.join("\n")}`;
	}

	return response;
}
