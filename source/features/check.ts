import type { Snowflake } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import pg, { Table } from "../pg.js";
import { ILLUMINATI_GUILD_ID } from "../utility/configuration.js";
import type { GuildsPacket } from "./guilds.js";

export async function check(userId: Snowflake) {
	const promises = [];
	const errorGuilds = [];

	for (const guild of GUILD_CACHE.values()) {
		if (guild.id === ILLUMINATI_GUILD_ID) {
			continue;
		}

		if (guild.unavailable) {
			errorGuilds.push(guild);
			continue;
		}

		promises.push(
			client
				.requestGuildMembers({
					guild_id: guild.id,
					user_ids: [userId],
				})
				.then((requestedGuildMembers) => ({
					guild,
					response: requestedGuildMembers,
				})),
		);
	}

	const settled = await Promise.allSettled(promises);
	const matchedGuilds = [];

	for (let index = 0; index < settled.length; index++) {
		const result = settled[index]!;

		if (result.status === "fulfilled") {
			if (result.value.response.members.length > 0) {
				matchedGuilds.push(result.value);
			}
		} else {
			errorGuilds.push(GUILD_CACHE.at(index));
		}
	}

	if (errorGuilds.length > 0) {
		console.log({ errorGuilds }, "Error while checking guilds.");
	}

	let response: string;

	if (matchedGuilds.length === 0) {
		response = `<@${userId}> not found.`;
	} else {
		matchedGuilds.sort(({ guild: guildA }, { guild: guildB }) =>
			guildA.profile === null
				? 1
				: guildB.profile === null
					? -1
					: guildA.profile.tag.localeCompare(guildB.profile.tag),
		);

		const guildsText =
			matchedGuilds.length === 1
				? "Found 1 guild"
				: `Found ${matchedGuilds.length} guilds`;

		response = `${guildsText} for <@${userId}>:\n${(
			await Promise.all(
				matchedGuilds.map(async ({ guild }, index) => {
					let string = `${index + 1}. `;

					if (guild.profile?.tag) {
						string += `\`[${guild.profile.tag}]\` `;
					}

					string += `${guild.name} <@${(await pg<GuildsPacket>(Table.Guilds).select("contact_id").where({ guild_id: guild.id }).first())?.contact_id ?? guild.ownerId}>`;
					return string;
				}),
			)
		).join("\n")}`;
	}

	return response;
}
