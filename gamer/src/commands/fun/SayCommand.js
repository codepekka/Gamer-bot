const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'fun', []);
  }

  run(client, message, args) {
    message.channel.send('say command works');
  }
}