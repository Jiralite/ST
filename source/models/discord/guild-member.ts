import type { APIGuildMember, APIUser } from "@discordjs/core";

export class GuildMember {
	public readonly user: APIUser;

	public constructor(data: APIGuildMember) {
		this.user = data.user;
	}
}
