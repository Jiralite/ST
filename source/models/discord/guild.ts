import type {
	APIGuild,
	GatewayGuildCreateDispatchData,
	Snowflake,
} from "@discordjs/core";

interface GuildProfile {
	tag: string;
	badge: string;
}

export class Guild {
	public readonly id: Snowflake;

	public name: string;

	public ownerId: Snowflake;

	public unavailable: boolean;

	public profile: GuildProfile | null;

	public constructor(data: GatewayGuildCreateDispatchData) {
		this.id = data.id;
		this.name = data.name;
		this.ownerId = data.owner_id;
		this.unavailable = data.unavailable ?? false;
		// @ts-expect-error Not yet typed.
		this.profile = data.profile;
	}

	public patch(data: APIGuild) {
		this.name = data.name;
		this.ownerId = data.owner_id;
		// @ts-expect-error Not yet typed.
		this.profile = data.profile;
	}
}
