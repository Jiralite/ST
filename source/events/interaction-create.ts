import { GatewayDispatchEvents } from "@discordjs/core";
import { CHAT_INPUT_COMMANDS } from "../commands/index.js";
import { isChatInputCommand } from "../utility/functions.js";
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
	},
} satisfies Event<typeof name>;
