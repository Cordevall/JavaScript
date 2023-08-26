const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const warningSchema = require('../../schemas/warnschema.js')

module.exports = {
  data: new SlashCommandBuilder()
  .setName("warn")
  .setDescription("Warns a member")
  .addUserOption(option => option.setName('user').setDescription('The user you want to warn').setRequired(true))
  .addStringOption(option => option.setName('reason').setDescription('This is the reason for warning the user').setRequired(false)),
  async execute (interaction) {

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({content: "You don't have the permission to warn people!", ephermal: true});
    const { options , guildId, user} = interaction;

    const target = options.getUser('user');
    const reason = options.getString('reason') || "No reason given"

    const UserTag = `${target.username}#${target.discriminator}`


    warningSchema.findOne({ guildId: guildId, UserID: target.id, UserTag: UserTag}, async (err,data) => {

      if (err) throw err;

      if (!data) {
        data = new warningSchema({
          guildId: guildId,
          UserID: target.id,
          UserTag: UserTag,
          Content: [
            {
              ExecuterID: user.id,
              ExecuterTag: user.tag,
              Reason: reason
            }
          ],
        });
      } else {
        const warnContent = {
          ExecuterID: user.id,
          ExecuterTag: user.tag,
          Reason: reason
        }
        data.Content.push(warnContent);
      }
      data.save()
    });

    const embed = new EmbedBuilder()
    .setColor("Yellow")
    .setDescription (` :warning: You have been **warned** in ${interaction.guild.name} | ${reason} `)

    const embed2 = new EmbedBuilder()
    .setColor("Green")
    .setDescription (` :white_check_mark: ${target} has been **Warned** | ${reason} `)

    target.send({embeds: [embed] }).catch(err => {
      const embed3 = new EmbedBuilder()
      .setColor('Red')
      .setDescription('The dm has not been sent cause the person has their dm off or has blocked me!')
      interaction.reply({embeds: {embed3}})
      return;
    })
    
    interaction.reply({embeds: [embed2]})
  }
}