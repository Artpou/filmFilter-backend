import "reflect-metadata"
import { DataSource } from "typeorm"
import { Film } from "./entity/Film"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "163.172.130.142",
    port: 3310,
    username: "etudiant",
    password: "CrERP29qwMNvcbnAMgLzW9CwuTC5eJHn",
    database: "sakila",
    synchronize: false,
    logging: false,
    entities: [Film],
    migrations: [],
    subscribers: [],
})
