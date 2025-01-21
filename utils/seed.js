const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { randomUUID } = require("crypto");

const users = [
  {
    username: "Greg",
    email: "greg@gmail.com",
  },
  {
    username: "Yoda",
    email: "yoda@gmail.com",
  },
  {
    username: "Luke",
    email: "luke@gmail.com",
  },
  {
    username: "Rennan",
    email: "rennan@gmail.com",
  },
  {
    username: "Mark",
    email: "mark@gmail.com",
  },
  {
    username: "dawson",
    email: "dawson@gmail.com",
  },
  {
    username: "Peter Parker",
    email: "pparker@gmail.com",
  },
];

const thoughts = [
  {
    thoughtText: "May the force be with you",
    username: "Yoda",
  },
  {
    thoughtText: "I got tangled today lol",
    username: "Peter",
  },
  {
    thoughtText: "Lovely day today",
    username: "Mark",
  },
  {
    thoughtText: "Mongo DB is cool",
    username: "Rennan",
  },
];

connection.once("open", async () => {
  console.log("Database connected");

  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert users
    const insertedUsers = await User.insertMany(users);

    // Map thoughts to random users
    for (const thought of thoughts) {
      const user = insertedUsers.find((user) => user.username === thought.username);
      if (user) {
        const createdThought = await Thought.create({ ...thought, userId: user._id });
        await User.findByIdAndUpdate(
          user._id,
          { $addToSet: { thoughts: createdThought._id } },
          { new: true }
        );
      }
    }

    console.log("Seeding complete! 🌱");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    process.exit(0);
  }
});
