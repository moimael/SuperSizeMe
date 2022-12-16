const keep_alive = require("./keep_alive.js");
const { Client, GatewayIntentBits } = require("discord.js");

const token = process.env["DISCORD_BOT_SECRET"];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on("message", (message) => {
  if (message.content.startsWith("!size")) {
    const user = message.mentions.users.first();
    if (!user) return message.reply("Please mention a valid user.");
    if (user.height && user.weight) {
      message.channel.send(
        `${user.username} is ${user.height} cm tall and weighs ${user.weight} kg.`
      );
    } else {
      message.channel.send(
        `${user.username} has not set their height and weight.`
      );
    }
  }
});

client.on("message", (message) => {
  if (message.content.startsWith("!setheight")) {
    const height = message.content.split(" ")[1];
    message.author.setHeight(height);
    message.channel.send(`Your height has been set to ${height} cm.`);
  }
  if (message.content.startsWith("!setweight")) {
    const weight = message.content.split(" ")[1];
    message.author.setWeight(weight);
    message.channel.send(`Your weight has been set to ${weight} kg.`);
  }
});

client.login(token);
