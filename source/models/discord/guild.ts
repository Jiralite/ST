import type {
	APIGuild,
	GatewayGuildCreateDispatchData,
	Snowflake,
} from "@discordjs/core";

export class Guild {
	public readonly id: Snowflake;

	public name: string;

	public ownerId: Snowflake;

	public unavailable: boolean;

	public constructor(data: GatewayGuildCreateDispatchData) {
		this.id = data.id;
		this.name = data.name;
		this.ownerId = data.owner_id;
		this.unavailable = data.unavailable ?? false;
	}

	public patch(data: APIGuild) {
		this.name = data.name;
		this.ownerId = data.owner_id;
	}
}
