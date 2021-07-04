const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require("discord.js");

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
    //permission checking:
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("you do not have permission to use that command.")
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I need ban permission to use that command")
    //Variables:
    let reason = args.slice(1).join(" ");
    let userID = args[0];

    //imput checking:
    if (!reason) reason = 'no reason given';
    if (!args[0]) return message.channel.send('you need to mention user you want to unban. `\gunban ID reason\`');
    if (!isNaN(args[0])) return message.channel.send("the ID is not found \`gunban ID reason\`")
    //executing
    message.guild.fetchBans().then(async bans => {
      if (bans.size == 0) return message.channel.send("this server has anyone banned.");
      let BUser = bans.find(b => b.user.id == userID)
      if (!BUser) return message.channel.send("the user is not banned.");
      await message.guild.members.unban(BUser.user, reason).catch(err => {
        console.log(err);
        return message.channel.send("Something went wrong.")
      }).then(() => {
        message.channel.send(`Member unbanned successfully. ${args[0]}`);
      });
    });

  }
}
