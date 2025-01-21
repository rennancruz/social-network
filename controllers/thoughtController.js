const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({ error: "Unable to retrieve thoughts", details: err });
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "No thought found with this ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ error: "Unable to retrieve the thought", details: err });
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      res.json({ message: "Thought created successfully", thought });
    } catch (err) {
      res.status(500).json({ error: "Unable to create the thought", details: err });
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought found with this ID" });
      }
      res.json({ message: "Thought updated successfully", thought });
    } catch (err) {
      res.status(500).json({ error: "Unable to update the thought", details: err });
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "No thought found with this ID" });
      }
      await User.findByIdAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      res.json({ message: "Thought deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Unable to delete the thought", details: err });
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought found with this ID" });
      }
      res.json({ message: "Reaction added successfully", thought });
    } catch (err) {
      res.status(500).json({ error: "Unable to add reaction", details: err });
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought found with this ID" });
      }
      res.json({ message: "Reaction removed successfully", thought });
    } catch (err) {
      res.status(500).json({ error: "Unable to remove reaction", details: err });
    }
  },
};