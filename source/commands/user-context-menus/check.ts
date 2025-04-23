import {
	type APIUserApplicationCommandInteraction,
	MessageFlags,
} from "@discordjs/core";
import { client } from "../../discord.js";
import { check } from "../../features/check.js";
import { APPLICATION_ID } from "../../utility/configuration.js";

export default {
	name: "Check",
	async userContextMenu(interaction: APIUserApplicationCommandInteraction) {
		await client.api.interactions.defer(interaction.id, interaction.token, {
			flags: MessageFlags.Ephemeral,
		});

		const response = await check(interaction.data.target_id);

		await client.api.interactions.editReply(APPLICATION_ID, interaction.token, {
			allowed_mentions: { parse: [] },
			content: response,
		});
	},
};
