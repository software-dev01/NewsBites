import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    link: {
      type: String,
      required: true,
    },

    publicationDate: Date,

    category: String,

    sourceAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
    },

    hash: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);