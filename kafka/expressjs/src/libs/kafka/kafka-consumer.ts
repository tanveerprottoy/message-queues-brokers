import { Consumer, ConsumerConfig, ConsumerRunConfig, ConsumerSubscribeTopics } from 'kafkajs';
import { ErrorUtils } from "../../utils/error-utils";
import { KafkaClientInstance } from "./kafka-client";

export class KafkaConsumer {
    consumer: Consumer

    async init(config: ConsumerConfig) {
        this.consumer = KafkaClientInstance.kafka.consumer(config);
    }

    async connect() {
        try {
            await this.consumer.connect();
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    async disconnect() {
        try {
            await this.consumer.disconnect();
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    /**
     * @param subscription - the subscription object ex.
     *              { topic: 'test-topic', fromBeginning: true }
     */
    async subscribe(subscription: ConsumerSubscribeTopics) {
        try {
            await this.consumer.subscribe(subscription);
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }
    /**
     * @param config - the ConsumerRunConfig object ex.
     *              {
                        eachMessage: async ({ topic, partition, message }) => {
                            console.log({value: message.value.toString()})
                    },  
     */
    async run(config: ConsumerRunConfig) {
        try {
            await this.consumer.run(config);
        }
        catch(e) {
            /* if(e instanceof Consumer.TooManyRequestsError) {
                this.consumer.pause([{ topic }])
                setTimeout(() => consumer.resume([{ topic }]), e.retryAfter * 1000)
            } */
            ErrorUtils.throwError(e);
        }
    }
}
