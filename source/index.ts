import { client, gateway } from "./discord.js";
import guildCreate from "./events/guild-create.js";
import guildDelete from "./events/guild-delete.js";
import guildMemberAdd from "./events/guild-member-add.js";
import guildMemberRemove from "./events/guild-member-remove.js";
import guildUpdate from "./events/guild-update.js";
import type { Event } from "./events/index.js";
import interactionCreate from "./events/interaction-create.js";
import ready from "./events/ready.js";

for (const event of [
	guildCreate,
	guildDelete,
	guildMemberAdd,
	guildMemberRemove,
	guildUpdate,
	interactionCreate,
	ready,
]) {
	const { name, once, fire }: Event = event;
	client[once ? "once" : "on"](name, fire);
}

void gateway.connect();
