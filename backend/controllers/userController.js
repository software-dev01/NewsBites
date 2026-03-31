import User from "../models/User.js";
import Article from "../models/Article.js";


// UPDATE USER PREFERENCES
export const updatePreferences = async (req, res) => {
  try {
    const { preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { preferences },
      { new: true }
    );

    res.json({
      message: "Preferences updated successfully",
      preferences: user.preferences
    });

  } catch (error) {
    res.status(500).json({
      message: "Updating preferences failed",
      error: error.message
    });
  }
};

export const getUserPreferences = async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("preferences");

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    res.status(200).json({
      preferences: user.preferences || []
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch preferences",
      error: error.message
    });

  }

};


// TOGGLE SAVE ARTICLE
export const toggleSaveArticle = async (req, res) => {
  try {
    const { articleId } = req.params;

    const user = await User.findById(req.user._id);

    const alreadySaved = user.savedArticles.includes(articleId);

    if (alreadySaved) {
      user.savedArticles.pull(articleId);
    } else {
      user.savedArticles.push(articleId);
    }

    await user.save();

    res.json({
      message: alreadySaved
        ? "Article removed from saved"
        : "Article saved successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Saving article failed",
      error: error.message
    });
  }
};



// GET SAVED ARTICLES
export const getSavedArticles = async (req, res) => {

  try {

    const user = await User.findById(req.user._id)
      .populate({
        path: "savedArticles",
        populate: {
          path: "sourceAgent",
          select: "name"
        }
      });

    const savedArticlesWithFlag = user.savedArticles.map(article => ({

      ...article.toObject(),

      isSaved: true

    }));

    res.json(savedArticlesWithFlag);

  } catch (error) {

    res.status(500).json({
      message: "Fetching saved articles failed"
    });

  }

};



// FOR YOU FEED (PERSONALIZED)
export const getPersonalizedFeed = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    const articles = await Article.find({
      category: { $in: user.preferences }
    }).sort({ publicationDate: -1 });

    const formattedFeed = articles.map(article => ({
      type: "article",
      data: article
    }));

    res.json(formattedFeed);

  } catch (error) {

    res.status(500).json({
      message: "Personalized feed failed"
    });

  }
};