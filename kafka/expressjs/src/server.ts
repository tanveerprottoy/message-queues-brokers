import express from "express";
import cors from "cors";
import { GlobalValues } from "./utils/constants";
import { initUserRouter } from "./modules/users/users-router";
import { DbClientInstance } from "./libs/mongodb";
import { KafkaClientInstance } from "./libs/kafka";
import usersService from "./modules/users/users-service";
import kafkaService from "./modules/kafka/kafka-service";

export async function createServer() {
    // init db
    await DbClientInstance.init(GlobalValues.DB_HOST, GlobalValues.DB_NAME);
    // init elastic
    await KafkaClientInstance.init({
        brokers: ["localhost:9092", "localhost:9093", "localhost:9094"]
    });
    const app: express.Application = express();
    const port: number = GlobalValues.PORT;

    // enabling cors for all requests by using cors middleware
    app.use(cors());

    // parse requests of content-type: application/json
    // parses incoming requests with JSON payloads
    app.use(express.json());
    // parse requests of application/x-www-form-urlencoded
    app.use(express.urlencoded({
        extended: true
    }));

    app.use(GlobalValues.API + GlobalValues.V1 + "/users", initUserRouter());

    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });
    kafkaService.init();
    return app;
}