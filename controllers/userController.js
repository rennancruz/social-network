const { User, Thought } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Unable to retrieve users", details: err });
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId).populate("thoughts friends");
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Unable to retrieve user", details: err });
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json({ message: "User created successfully", user });
    } catch (err) {
      res.status(400).json({ error: "Unable to create user", details: err });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      res.json({ message: "User updated successfully", user });
    } catch (err) {
      res.status(500).json({ error: "Unable to update user", details: err });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and associated thoughts deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Unable to delete user", details: err });
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      res.json({ message: "Friend added successfully", user });
    } catch (err) {
      res.status(500).json({ error: "Unable to add friend", details: err });
    }
  },

  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      res.json({ message: "Friend removed successfully", user });
    } catch (err) {
      res.status(500).json({ error: "Unable to remove friend", details: err });
    }
  },
};
