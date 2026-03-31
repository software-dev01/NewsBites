import Article from "../models/Article.js";
import User from "../models/User.js";


export const getArticleById = async (req, res) => {

  try {

    const article = await Article.findById(req.params.id)
      .populate("sourceAgent", "name");

    if (!article) {

      return res.status(404).json({
        message: "Article not found"
      });

    }


    let isSaved = false;

    // check if logged-in user exists

    if (req.user) {

      const user = await User.findById(req.user._id);

      isSaved = user.savedArticles.includes(article._id);

    }


    res.json({
      ...article.toObject(),
      isSaved
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch article",
      error: error.message
    });

  }

};