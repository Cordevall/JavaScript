const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const { MongoClient } = require("mongodb");
require('dotenv').config();

// MongoDB connection URI
const uri = process.env.mongoDB;
// MongoDB database name
const dbName = "yourdbname";
// MongoDB collection name for warnings
const collectionName = "warnings";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warns a member")
    .addUserOption(option => option.setName('user').setDescription('The user you want to warn').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('This is the reason for warning the user').setRequired(false)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return await interaction.reply({ content: "You don't have the permission to warn people!", ephemeral: true });
    }

    const { options, guildId, user } = interaction;

    const target = options.getUser('user');
    const reason = options.getString('reason') || "No reason given";

    const userTag = `${target.username}#${target.discriminator}`;

    // Create a MongoDB client
    const client = new MongoClient(uri);

    try {
      // Connect to the MongoDB server
      await client.connect();

      // Access the database
      const db = client.db(dbName);

      // Access the collection for warnings
      const collection = db.collection(collectionName);

      // Create a new warning document
      const warning = {
        guildId,
        userId: target.id,
        userTag,
        reason,
      };

      // Insert the warning document into the collection
      await collection.insertOne(warning);

      const embed = new EmbedBuilder()
        .setColor(proccess.env.pending)
        .setDescription(`:warning: You have been **warned** in ${interaction.guild.name} | ${reason}`);

      const embed2 = new EmbedBuilder()
        .setColor(process.env.success)
        .setDescription(`:white_check_mark: ${target} has been **Warned** | ${reason}`);

      target.send({ embeds: [embed] })
        .catch(err => {
          const embed3 = new EmbedBuilder()
            .setColor('Red')
            .setDescription('The dm has not been sent because the person has their dm off or has blocked me!');
          interaction.reply({ embeds: [embed3] });
          return;
        });

      interaction.reply({ embeds: [embed2] });
    } finally {
      // Close the MongoDB client
      await client.close();
    }
  }
};
