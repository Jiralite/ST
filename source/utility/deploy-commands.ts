import {
	API,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ApplicationIntegrationType,
	InteractionContextType,
	type RESTPutAPIApplicationGuildCommandsJSONBody,
} from "@discordjs/core";
import { REST } from "@discordjs/rest";
import {
	APPLICATION_ID,
	DISCORD_TOKEN,
	ILLUMINATI_GUILD_ID,
} from "./configuration.js";

const GUILD_COMMANDS: RESTPutAPIApplicationGuildCommandsJSONBody = [
	{
		name: "check",
		type: ApplicationCommandType.ChatInput,
		description: "Checks a user.",
		options: [
			{
				type: ApplicationCommandOptionType.User,
				name: "user",
				description: "The user to check.",
				required: true,
			},
		],
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		],
	},
] as const;

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
const api = new API(rest);
console.info("Setting application commands...");

const commands = [
	api.applicationCommands.bulkOverwriteGuildCommands(
		APPLICATION_ID,
		ILLUMINATI_GUILD_ID,
		GUILD_COMMANDS,
	),
];

try {
	await Promise.all(commands);
	console.info("Successfully set application commands.");
} catch (error) {
	console.error(error, "Error setting commands.");
}
