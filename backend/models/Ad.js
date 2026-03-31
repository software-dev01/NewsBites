import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    targetLink: {
      type: String,
      required: true,
    },

    category: {
      type: String,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ad", adSchema);