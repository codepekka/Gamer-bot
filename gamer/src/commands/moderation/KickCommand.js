const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js'); 

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("you do not have permission to use that command.");
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "no reason given";
    const kickEmbed = new discord.MessageEmbed()
     .setTitle(`you were kicked from ${message.guild.name}`)
     .setDescription(`reason ${reason}`)
     .setColor ("#0341fc")
     .setTimestamp()
     .setFooter(client.user.tag, client.user.displayAvatarURL())

     // g kick @user reason (reason)
     if (!args[0]) return message.channel.send("you need to mention user you want to kick. \`gkick @user reason\`");
     if (!mentionedMember) return message.channel.send("I could not find that member.");
     if (!mentionedMember.kickable) return message.channel.send("I could not kick that member.");
     try {
       await mentionedMember.send(kickEmbed);
     } catch (err) {
       console.log(`i counld not message that member`);
     }
     
     try {
       await mentionedMember.kick(reason)
     } catch (err) {
       console.log(err);
       return message.channel.send("Im sorry i could not kick that user.")
     }
  }
}