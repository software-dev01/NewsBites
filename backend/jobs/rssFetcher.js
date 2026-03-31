import cron from "node-cron";
import Parser from "rss-parser";
import crypto from "crypto";

import Agent from "../models/Agent.js";
import Article from "../models/Article.js";

const parser = new Parser();

const startRSSFetcher = () => {

  cron.schedule("* * * * *", async () => {

    console.log("Running RSS Fetcher...");

    try {

      const agents = await Agent.find({ active: true });

      for (const agent of agents) {

        try {

          const feed = await parser.parseURL(agent.rssUrl);

          for (const item of feed.items) {

            const hash = crypto
              .createHash("md5")
              .update(item.link)
              .digest("hex");

            const exists = await Article.findOne({ hash });

            if (!exists) {

              await Article.create({
                title: item.title,
                description: item.contentSnippet,
                link: item.link,
                publicationDate: item.pubDate,
                category: agent.category,
                sourceAgent: agent._id,
                hash
              });

              console.log("Article saved:", item.title);

            }

          }

        } catch (error) {

          console.log(
            "Error fetching agent:",
            agent.name
          );

        }

      }

    } catch (error) {

      console.log("RSS Worker Error:", error.message);

    }

  });

};

export default startRSSFetcher;