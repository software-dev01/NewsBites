import Article from "../models/Article.js";
import Ad from "../models/Ad.js";
import User from "../models/User.js";

export const getFeed = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    // Get logged-in user's saved articles
    let savedArticlesSet = new Set();

    if (req.user?._id) {
      const user = await User.findById(req.user._id).select("savedArticles");

      savedArticlesSet = new Set(
        user.savedArticles.map(id => id.toString())
      );
    }

    const articles = await Article.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const ads = await Ad.find({ active: true });

    let feed = [];
    let adIndex = Math.floor(skip / 5);

    articles.forEach((article, index) => {

      const articleObj = article.toObject();

      feed.push({
        type: "article",
        data: {
          ...articleObj,
          isSaved: savedArticlesSet.has(article._id.toString())
        }
      });

      if (((skip + index + 1) % 5 === 0) && ads.length > 0){
        feed.push({
          type: "ad",
          data: ads[adIndex % ads.length]
        });

        adIndex++;
      }
    });

    res.json(feed);

  } catch (error) {
    res.status(500).json({
      message: "Feed loading failed",
      error: error.message
    });
  }
};