import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    rssUrl: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    fetchInterval: {
      type: Number,
      default: 10,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Agent", agentSchema);