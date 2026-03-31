import AdAnalytics from "../models/AdAnalytics.js";


// TRACK AD VIEW (UNIQUE PER USER)
export const trackAdView = async (req, res) => {
  try {
    const { adId } = req.params;
    const userId = req.user._id;

    let record = await AdAnalytics.findOne({
      userId,
      adId
    });

    if (!record) {
      record = await AdAnalytics.create({
        userId,
        adId,
        viewed: true,
        viewedAt: new Date()
      });
    }

    res.json({
      message: "Ad view tracked"
    });

  } catch (error) {

    res.status(500).json({
      message: "Tracking view failed",
      error: error.message
    });

  }
};



// TRACK AD CLICK
export const trackAdClick = async (req, res) => {
  try {
    const { adId } = req.params;
    const userId = req.user._id;

    let record = await AdAnalytics.findOne({
      userId,
      adId
    });

    if (!record) {
      record = await AdAnalytics.create({
        userId,
        adId,
        clicked: true,
        clickedAt: new Date()
      });
    } else {
      record.clicked = true;
      record.clickedAt = new Date();

      await record.save();
    }

    res.json({
      message: "Ad click tracked"
    });

  } catch (error) {

    res.status(500).json({
      message: "Tracking click failed",
      error: error.message
    });

  }
};