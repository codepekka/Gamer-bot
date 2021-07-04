const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {
    //permission checking:
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("you do not have permission to use that command.")
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send ("I need ban permission to use that command")
    //Variables:
    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first();

    //imput checking:
    if (!reason) reason = 'no reason given';
    if (!args[0]) return message.channel.send('you need to mention user you want to ban. `\gban @user reason\`');
    if (!mentionedMember) return message.channel.send("I could not find that member.")
    if (!mentionedMember.banable) return message.channel.send("I could not ban that member.");
 
   
    //executing
    const banEmbed = new Discord.MessageEmbed()
    .setTitle(`you were banned from ${message.guild.name}`)
    .setDescription(`Reason: ${reason}`)
    .setColor("#0341fc")
    .setTimestamp();

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send("Member banned successfully " + mentionedMember.user.tag));
  }
}