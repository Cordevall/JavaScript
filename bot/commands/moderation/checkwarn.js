const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const warningSchema = require('../../schemas/warnschema')

module.exports = {
  data: new SlashCommandBuilder()
  .setName("checkwarn")
  .setDescription("Checks a member warnings")
  .addUserOption(option => option.setName('user').setDescription('The user you want to check warns').setRequired(true)),
  async execute (interaction) {

    const { options , guildId, user} = interaction;

    const target = options.getUser('user');
    const embed = new EmbedBuilder()
    const noWarns = new EmbedBuilder()
    
    warningSchema.findOne({ guildId: guildId, UserID: target.id, UserTag: target.tag}, async (err,data) => {

      if (err) throw err;

      if (data) { 
        embed.setColor('Red')
        .setDescription(`:x: ${target.tag}'s warnings: \n ${data.Content.map(
          (w, i) => 
           `
           **Warning**: ${i + 1}
           **Warning Moderator**: ${w.ExecuterTag}
           **Warning Reason**: ${w.Reason}
           `
        ).join('-')}` )

        interaction.reply({ embeds : [embed]});
      } else {
        noWarns.setColor('Green')
        .setDescription(`:white_check_mark: ${target.tag} has **0** Warnings!`)

        interaction.reply (ephemal =true,{embeds: [noWarns],})
      }
    });

 }
}