import process from "node:process";
import type { Snowflake } from "@discordjs/core";

if (
	!(
		process.env.APPLICATION_ID &&
		process.env.DISCORD_TOKEN &&
		process.env.ILLUMINATI_GUILD_ID &&
		process.env.GUILD_1 &&
		process.env.GUILD_2 &&
		process.env.GUILD_3 &&
		process.env.GUILD_4 &&
		process.env.GUILD_5 &&
		process.env.GUILD_6 &&
		process.env.GUILD_7 &&
		process.env.GUILD_7_CONTACT_ID &&
		process.env.GUILD_8 &&
		process.env.GUILD_9 &&
		process.env.GUILD_10 &&
		process.env.GUILD_11 &&
		process.env.GUILD_12 &&
		process.env.GUILD_13
	)
) {
	throw new Error("Missing environment variables.");
}

export const APPLICATION_ID = process.env.APPLICATION_ID;
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const ILLUMINATI_GUILD_ID = process.env.ILLUMINATI_GUILD_ID;

export const GUILDS_CHECKING = [
	ILLUMINATI_GUILD_ID,
	process.env.GUILD_1,
	process.env.GUILD_2,
	process.env.GUILD_3,
	process.env.GUILD_4,
	process.env.GUILD_5,
	process.env.GUILD_6,
	process.env.GUILD_7,
	process.env.GUILD_8,
	process.env.GUILD_9,
	process.env.GUILD_10,
	process.env.GUILD_11,
	process.env.GUILD_12,
	process.env.GUILD_13,
] as const satisfies Readonly<Snowflake[]>;

export const GUILD_7 = process.env.GUILD_7;
export const GUILD_7_CONTACT_ID = process.env.GUILD_7_CONTACT_ID;
