import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteraction,
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
