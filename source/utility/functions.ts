import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteraction,
	type APIUserApplicationCommandInteraction,
	ApplicationCommandType,
	InteractionType,
} from "@discordjs/core";

export function isChatInputCommand(
	interaction: APIInteraction,
): interaction is APIChatInputApplicationCommandInteraction {
	return (
		interaction.type === InteractionType.ApplicationCommand &&
		interaction.data.type === ApplicationCommandType.ChatInput
	);
}

export function isUserContextMenuCommand(
	interaction: APIInteraction,
): interaction is APIUserApplicationCommandInteraction {
	return (
		interaction.type === InteractionType.ApplicationCommand &&
		interaction.data.type === ApplicationCommandType.User
	);
}
