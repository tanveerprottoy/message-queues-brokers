import { Producer, ProducerBatch, ProducerConfig, ProducerRecord, RecordMetadata } from 'kafkajs';
import { ErrorUtils } from "../../utils/error-utils";
import { KafkaClientInstance } from "./kafka-client";

export class KafkaProducer {
    producer: Producer

    async init(config?: ProducerConfig) {
        if(!config) {
            this.producer = KafkaClientInstance.kafka.producer();
            return;
        }
        this.producer = KafkaClientInstance.kafka.producer(config);
    }

    async connect() {
        try {
            await this.producer.connect();
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    async disconnect() {
        try {
            await this.producer.disconnect();
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    /**
     * @param record - the record object ex.
     *              {
                        topic: 'test-topic',
                        messages: [
                            { value: 'Hello KafkaJS user!' },
                        ],
                    }
     */
    async send(record: ProducerRecord): Promise<RecordMetadata[]> {
        try {
            return await this.producer.send(record);
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    async sendBatch(batch: ProducerBatch): Promise<RecordMetadata[]> {
        try {
            return await this.producer.sendBatch(batch);
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }
}
