import {
	API,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ApplicationIntegrationType,
	InteractionContextType,
	PermissionFlagsBits,
	type RESTPutAPIApplicationCommandsJSONBody,
	type RESTPutAPIApplicationGuildCommandsJSONBody,
} from "@discordjs/core";
import { REST } from "@discordjs/rest";
import {
	APPLICATION_ID,
	DISCORD_TOKEN,
	ILLUMINATI_GUILD_ID,
} from "./configuration.js";

const COMMANDS: RESTPutAPIApplicationCommandsJSONBody = [
	{
		name: "Check",
		type: ApplicationCommandType.User,
		integration_types: [
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall,
		],
		contexts: [
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		],
		default_member_permissions: PermissionFlagsBits.ManageGuild.toString(),
	},
] as const;

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

const settled = await Promise.allSettled([
	api.applicationCommands.bulkOverwriteGlobalCommands(APPLICATION_ID, COMMANDS),
	api.applicationCommands.bulkOverwriteGuildCommands(
		APPLICATION_ID,
		ILLUMINATI_GUILD_ID,
		GUILD_COMMANDS,
	),
]);

const errors = settled
	.filter(
		(result): result is PromiseRejectedResult => result.status === "rejected",
	)
	.map((result) => result.reason);

if (errors.length > 0) {
	console.error(errors, "Error setting commands.");
} else {
	console.info("Successfully set application commands.");
}
