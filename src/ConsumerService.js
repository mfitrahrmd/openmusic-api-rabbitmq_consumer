require('dotenv').config();
const amqp = require('amqplib');

const listener = require('./listener');

class Consumer {
  // declaring the following two variables is optional
  _connection;

  _channel;

  static async init() {
    this._connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    this._channel = await this._connection.createChannel();

    await this._channel.assertQueue('export:playlist', {
      durable: true,
    });

    await this._channel.consume('export:playlist', listener.exportPlaylist, { noAck: true });

    console.log('Start listening...');
    console.log('Press CTRL + C to exit.');
  }
}

Consumer.init();
