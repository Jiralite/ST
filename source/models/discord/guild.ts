import type {
	APIGuild,
	GatewayGuildCreateDispatchData,
	Snowflake,
} from "@discordjs/core";
import { client } from "../../discord.js";
import { GuildMember } from "./guild-member.js";

export class Guild {
	public readonly id: Snowflake;

	public name: string;

	public unavailable: boolean;

	public members: Map<Snowflake, GuildMember> = new Map();

	public constructor(data: GatewayGuildCreateDispatchData) {
		this.id = data.id;
		this.name = data.name;
		this.unavailable = data.unavailable ?? false;

		for (const member of data.members) {
			this.members.set(member.user.id, new GuildMember(member));
		}
	}

	public patch(data: APIGuild) {
		this.name = data.name;
	}

	public async cacheAllMembers() {
		const requestGuildMembersResponse = await client.requestGuildMembers({
			guild_id: this.id,
			limit: 0,
			query: "",
		});

		this.members.clear();

		for (const member of requestGuildMembersResponse.members) {
			this.members.set(member.user.id, member);
		}
	}
}
