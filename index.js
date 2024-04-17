const keep_alive = require("./keep_alive.js");
const { Client, Events, GatewayIntentBits } = require("discord.js");
const Keyv = require("keyv");
const keyv = new Keyv("sqlite://./db.sqlite");

const token = process.env["DISCORD_BOT_SECRET"];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "size") {
      const user = interaction.options.getUser("user");
      if (!user) return interaction.reply("Please mention a valid user.");
      const [height, weight] = (await keyv.get(user.id)) || [];
      if (height && weight) {
        return interaction.reply(
          `${user.username} is ${height} cm tall and weighs ${weight} kg.`
        );
      } else {
        return interaction.reply(
          `${user.username} has not set their height and weight.`
        );
      }
    }

    if (interaction.commandName === "setweight") {
      const newWeight = interaction.options.getInteger("weight");
      const [height, _] = (await keyv.get(interaction.user.id)) || ["", ""];
      await keyv.set(interaction.user.id, [height, newWeight]);
      return interaction.reply({
        content: `Your weight has been set to ${newWeight}kg.`,
        ephemeral: true,
      });
    }

    if (interaction.commandName === "setheight") {
      const newHeight = interaction.options.getInteger("height");
      const [_, weight] = (await keyv.get(interaction.user.id)) || ["", ""];
      await keyv.set(interaction.user.id, [newHeight, weight]);

      return interaction.reply({
        content: `Your height has been set to ${newHeight}cm.`,
        ephemeral: true,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

client.login(token);
