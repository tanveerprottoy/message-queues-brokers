import { Kafka, KafkaConfig } from 'kafkajs';
import { ErrorUtils } from "../../utils/error-utils";

class KafkaClient {
    private static instance: KafkaClient;
    kafka: Kafka;

    private constructor() {
        console.log("KafkaClient init");
        if(KafkaClient.instance) {
            ErrorUtils.throwError(
                new Error("Error - already initialized")
            );
        }
    }

    // const kafkaConfig: KafkaConfig = { brokers: ['localhost:9092'] }
    async init(
        config: KafkaConfig
    ) {
        try {
            this.kafka = new Kafka(config);
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    static getInstance(): KafkaClient {
        KafkaClient.instance = KafkaClient.instance || new KafkaClient();
        return KafkaClient.instance;
    }
}

export const KafkaClientInstance = KafkaClient.getInstance();