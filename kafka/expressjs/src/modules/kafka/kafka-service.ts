import { KafkaConsumer, KafkaProducer } from "../../libs/kafka";

class KafkaService {
    kafkaProducer: KafkaProducer;
    kafkaConsumer: KafkaConsumer;

    init() {
        this.kafkaProducer = new KafkaProducer();
        this.kafkaProducer.init();
        this.kafkaProducer.connect();
        this.kafkaConsumer = new KafkaConsumer();
        this.kafkaConsumer.init({
            groupId: "kafka.service"
        });
        this.kafkaConsumer.connect();
        this.kafkaConsumer.subscribe({
            topics: ["kafka-service"],
            fromBeginning: true
        });
        this.readEachMessage();
    }

    send = async (
        data: any
    ): Promise<any> => {
        console.log("kafka.send: ", data);
        /* {
               topic: <String>,
               messages: <Message[]>,
               acks: <Number>,
               timeout: <Number>,
               compression: <CompressionTypes>,
           } */
        const result = await this.kafkaProducer.send({
            topic: "kafka-service",
            messages: [
                { value: data.name },
            ],
        });
        console.log(result);
        return result;
    };

    sendBatch = async (
        data: any
    ): Promise<any> => {
        const messages = [
            {
                topic: "topic-a",
                messages: [{ key: "key", value: "hello topic-a" }],
            },
            {
                topic: "topic-b",
                messages: [{ key: "key", value: "hello topic-b" }],
            },
            {
                topic: "topic-c",
                messages: [
                    {
                        key: "key",
                        value: "hello topic-c",
                        headers: {
                            "correlation-id": "2bfb68bb-893a-423b-a7fa-7b568cad5b67",
                        },
                    }
                ],
            }
        ];
        /* {
               topicMessages: <TopicMessages[]>,
               acks: <Number>,
               timeout: <Number>,
               compression: <CompressionTypes>,
           } */
        const result = await this.kafkaProducer.sendBatch(
            {
                topicMessages: messages
            }
        );
        console.log(result);
        return result;
    };

    readEachMessage = async () => {
        await this.kafkaConsumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
                // console.log("eachMessage: ", message);
                console.log("eachMessage", {
                    // key: message.key.toString(),
                    value: message.value.toString(),
                    headers: message.headers,
                });
            },
        });
    };

    readEachBatch = async () => {
        await this.kafkaConsumer.run({
            eachBatchAutoResolve: true,
            eachBatch: async ({
                batch,
                resolveOffset,
                heartbeat,
                commitOffsetsIfNecessary,
                uncommittedOffsets,
                isRunning,
                isStale,
                pause,
            }) => {
                for(let message of batch.messages) {
                    console.log({
                        topic: batch.topic,
                        partition: batch.partition,
                        highWatermark: batch.highWatermark,
                        message: {
                            offset: message.offset,
                            key: message.key.toString(),
                            value: message.value.toString(),
                            headers: message.headers,
                        }
                    })

                    resolveOffset(message.offset)
                    await heartbeat()
                }
            },
        });
    };
}

export default new KafkaService;