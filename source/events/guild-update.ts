import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildUpdate;

export default {
	name,
	fire({ data }) {
		const guild = GUILD_CACHE.get(data.id);

		if (!guild) {
			console.warn(
				{ data },
				`Received a ${name} packet for an uncached guild.`,
			);

			return;
		}

		guild.patch(data);
	},
} satisfies Event<typeof name>;
