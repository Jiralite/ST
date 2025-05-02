import process from "node:process";

if (
	!(
		process.env.APPLICATION_ID &&
		process.env.DISCORD_TOKEN &&
		process.env.ILLUMINATI_GUILD_ID &&
		process.env.DATABASE_URL
	)
) {
	throw new Error("Missing environment variables.");
}

export const APPLICATION_ID = process.env.APPLICATION_ID;
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const ILLUMINATI_GUILD_ID = process.env.ILLUMINATI_GUILD_ID;
export const DATABASE_URL = process.env.DATABASE_URL;
