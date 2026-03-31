import mongoose from "mongoose";

const adAnalyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    adId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
      required: true,
    },

    viewed: {
      type: Boolean,
      default: false,
    },

    clicked: {
      type: Boolean,
      default: false,
    },

    viewedAt: Date,

    clickedAt: Date,
  },
  { timestamps: true }
);

adAnalyticsSchema.index({ userId: 1, adId: 1 }, { unique: true });

export default mongoose.model("AdAnalytics", adAnalyticsSchema);