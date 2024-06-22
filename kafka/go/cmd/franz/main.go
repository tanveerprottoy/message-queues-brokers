package main

import "github.com/tanveerprottoy/message-queues-brokers/rabbitmq/kafka/franz"

func main() {
	franz.CreateClientTopic()
	franz.BasicProducerConsumer()
}
