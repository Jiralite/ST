import {
	type APIChatInputApplicationCommandInteraction,
	ApplicationCommandOptionType,
} from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import {
	APPLICATION_ID,
	ILLUMINATI_GUILD_ID,
} from "../utility/configuration.js";

export async function check(
	interaction: APIChatInputApplicationCommandInteraction,
) {
	await client.api.interactions.defer(interaction.id, interaction.token);
	const option = interaction.data.options?.[0];

	if (
		!(
			option?.name === "user" &&
			option.type === ApplicationCommandOptionType.User
		)
	) {
		return;
	}

	const matchedGuilds = [];

	for (const guild of GUILD_CACHE.values()) {
		if (guild.id === ILLUMINATI_GUILD_ID) {
			continue;
		}

		const requestGuildMembersResult = await client.requestGuildMembers({
			guild_id: guild.id,
			user_ids: [option.value],
		});

		if (requestGuildMembersResult.members[0]) {
			matchedGuilds.push(guild);
		}
	}

	await client.api.interactions.editReply(APPLICATION_ID, interaction.token, {
		allowed_mentions: { parse: [] },
		content:
			matchedGuilds.length === 0
				? `<@${option.value}> not found.`
				: `Found ${matchedGuilds.length} guilds for <@${option.value}>:\n${matchedGuilds.map((matchedGuild) => `- ${matchedGuild.name}`).join("\n")}`,
	});
}
