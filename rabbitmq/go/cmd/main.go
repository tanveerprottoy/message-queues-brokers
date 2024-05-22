package main

import "txp/rabbitmq/rabbitmq"

func main() {
	rabbitmq.Send()
	rabbitmq.Receive()
}
