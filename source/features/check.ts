import {
	type APIChatInputApplicationCommandInteraction,
	ApplicationCommandOptionType,
} from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";

export async function check(
	interaction: APIChatInputApplicationCommandInteraction,
) {
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
		if (guild.members.has(option.value)) {
			matchedGuilds.push(guild);
		}
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		allowed_mentions: { parse: [] },
		content:
			matchedGuilds.length === 0
				? `<@${option.value}> not found.`
				: `Found ${matchedGuilds.length} guilds for <@${option.value}>:\n${matchedGuilds.map((matchedGuild) => `- ${matchedGuild.name}`).join("\n")}`,
	});
}
