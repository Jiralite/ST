import type { APIChatInputApplicationCommandInteraction } from "@discordjs/core";
import { check } from "../../features/check.js";

export default {
	name: "check",
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		await check(interaction);
	},
} as const;
