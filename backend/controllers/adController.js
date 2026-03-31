import mongoose from "mongoose";
import Ad from "../models/Ad.js";
import AdAnalytics from "../models/AdAnalytics.js";

// CREATE AD
export const createAd = async (req, res) => {
  try {

    const ad = await Ad.create(req.body);

    res.status(201).json(ad);

  } catch (error) {

    res.status(500).json({
      message: "Ad creation failed"
    });

  }
};


// GET ADS
export const getAds = async (req, res) => {
  try {

    const ads = await Ad.find();

    res.json(ads);

  } catch (error) {

    res.status(500).json({
      message: "Fetch failed"
    });

  }
};


// UPDATE AD
export const updateAd = async (req, res) => {
  try {

    const ad = await Ad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(ad);

  } catch (error) {

    res.status(500).json({
      message: "Update failed"
    });

  }
};


// DELETE AD
export const deleteAd = async (req, res) => {
  try {

    await Ad.findByIdAndDelete(req.params.id);

    res.json({
      message: "Ad deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Delete failed"
    });

  }
};



export const getAdAnalytics = async (req, res) => {
  try {

    const { adId } = req.params;

    const analytics = await AdAnalytics.aggregate([
      {
        $match: {
          adId: new mongoose.Types.ObjectId(adId)
        }
      },
      {
        $group: {
          _id: "$adId",
          totalViews: {
            $sum: {
              $cond: ["$viewed", 1, 0]
            }
          },
          totalClicks: {
            $sum: {
              $cond: ["$clicked", 1, 0]
            }
          }
        }
      }
    ]);

    const result = analytics[0] || {
      totalViews: 0,
      totalClicks: 0
    };

    const ctr =
      result.totalViews === 0
        ? 0
        : (
            result.totalClicks /
            result.totalViews
          ) * 100;

    res.json({
      totalViews: result.totalViews,
      totalClicks: result.totalClicks,
      ctr: ctr.toFixed(2) + "%"
    });

  } catch (error) {

    res.status(500).json({
      message: "Analytics failed",
      error: error.message
    });

  }
};