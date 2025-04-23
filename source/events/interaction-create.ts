import { GatewayDispatchEvents } from "@discordjs/core";
import {
	CHAT_INPUT_COMMANDS,
	USER_CONTEXT_MENU_COMMANDS,
} from "../commands/index.js";
import {
	isChatInputCommand,
	isUserContextMenuCommand,
} from "../utility/functions.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.InteractionCreate;

export default {
	name,
	async fire({ data }) {
		if (isChatInputCommand(data)) {
			const command = CHAT_INPUT_COMMANDS.find(
				({ name }) => name === data.data.name,
			);

			if (!command) {
				console.warn(
					data,
					"Received an unknown chat input command interaction.",
				);

				return;
			}

			try {
				await command.chatInput(data);
			} catch (error) {
				console.error(
					{ error, command: command.name },
					"An error occurred while executing a chat input command.",
				);
			}

			return;
		}

		if (isUserContextMenuCommand(data)) {
			const command = USER_CONTEXT_MENU_COMMANDS.find(
				({ name }) => name === data.data.name,
			);

			if (!command) {
				console.warn(
					data,
					"Received an unknown user context menu command interaction.",
				);
				return;
			}

			try {
				await command.userContextMenu(data);
			} catch (error) {
				console.error(
					{ error, command: command.name },
					"An error occurred while executing a user context menu command.",
				);
			}

			return;
		}
	},
} satisfies Event<typeof name>;
