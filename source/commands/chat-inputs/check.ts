import {
	type APIChatInputApplicationCommandInteraction,
	ApplicationCommandOptionType,
} from "@discordjs/core";
import { client } from "../../discord.js";
import { check } from "../../features/check.js";
import { APPLICATION_ID } from "../../utility/configuration.js";

export default {
	name: "check",
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const option = interaction.data.options?.[0];

		if (
			!(
				option?.name === "user" &&
				option.type === ApplicationCommandOptionType.User
			)
		) {
			return;
		}

		await client.api.interactions.defer(interaction.id, interaction.token);
		const response = await check(option.value);

		await client.api.interactions.editReply(APPLICATION_ID, interaction.token, {
			allowed_mentions: { parse: [] },
			content: response,
		});
	},
} as const;
