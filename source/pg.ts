import knex from "knex";
import { DATABASE_URL } from "./utility/configuration.js";

export enum Table {
	Guilds = "guilds",
}

export default knex({
	client: "pg",
	connection: DATABASE_URL,
	pool: { min: 0 },
});
