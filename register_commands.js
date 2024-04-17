const { REST, Routes } = require("discord.js");

const client_id = process.env["CLIENT_ID"];

const commands = [
  {
    name: "setheight",
    description: "Set your height",
    options: [
      {
        type: 4,
        name: "height",
        description: "Your height in cm",
        required: true,
        min_value: 140,
        max_value: 220,
      },
    ],
  },
  {
    name: "setweight",
    description: "Set your weight",
    options: [
      {
        type: 4,
        name: "weight",
        description: "Your weight in kg",
        required: true,
        min_value: 40,
        max_value: 250,
      },
    ],
  },
  {
    name: "size",
    description: "Get someone size",
    options: [
      {
        type: 6,
        name: "user",
        description: "User to get size info from",
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(client_id), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
