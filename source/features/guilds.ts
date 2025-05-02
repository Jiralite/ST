import type { Snowflake } from "@discordjs/core";

export interface GuildsPacket {
	guild_id: Snowflake;
	contact_id: Snowflake | null;
}
