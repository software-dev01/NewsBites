import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  Clock,
  Tag,
  ExternalLink,
  Newspaper
} from "lucide-react";

import API from "../services/api";
import toast from "react-hot-toast";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function ArticleCard({ article }) {

  const navigate = useNavigate();

  const [saved, setSaved] = useState(article.isSaved || false);
  const [loading, setLoading] = useState(false);


  const handleReadMore = () => {

    navigate(`/article/${article._id}`);

  };


  const toggleSave = async () => {

    try {

      setLoading(true);

      await API.post(`/user/save/${article._id}`);

      if (!saved) {
        toast.success("Article saved")
        setSaved(true);
      } else {
        toast.success("Removed from saved");
        setSaved(false);
      }

    } catch {

      toast.error("Action failed");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="p-5 space-y-3">

      {/* CATEGORY + TIME */}

      <div className="flex justify-between items-center text-xs">

        <span className="flex items-center gap-1 bg-indigo-100 text-indigo-600 px-2 py-1 rounded-md font-medium">

          <Tag size={14} />

          {article.category || "General"}

        </span>


        <span className="flex items-center gap-1 text-gray-400">

          <Clock size={14} />

          {dayjs(article.publicationDate).fromNow()}

        </span>

      </div>


      {/* TITLE */}

      <h3 className="text-lg font-semibold text-gray-800 leading-snug">

        {article.title}

      </h3>


      {/* DESCRIPTION */}

      <p className="text-gray-600 text-sm line-clamp-2">

        {article.description}

      </p>


      {/* SOURCE NAME */}

      {

        article.sourceAgent?.name && (

          <p className="flex items-center gap-1 text-xs text-gray-400">

            <Newspaper size={14} />

            {article.sourceAgent.name}

          </p>

        )

      }


      {/* ACTIONS */}

      <div className="flex justify-between items-center pt-2">


        {/* READ MORE */}

        <button
          onClick={handleReadMore}
          className="text-indigo-600 hover:underline text-sm font-medium"
        >

          Read More →

        </button>


        {/* SAVE BUTTON */}

        <button
          onClick={toggleSave}
          disabled={loading}
          className={`flex items-center gap-1 transition text-sm
            ${saved
              ? "text-indigo-600"
              : "text-gray-400 hover:text-indigo-600"
            }
          `}
        >

          <Bookmark
            size={18}
            fill={saved ? "currentColor" : "none"}
          />

          {saved ? "Saved" : "Save"}

        </button>

      </div>


      {/* ORIGINAL SOURCE */}

      <a
        href={article.link}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1 text-xs text-gray-400 hover:underline pt-1"
      >

        <ExternalLink size={14} />

        View original source

      </a>

    </div>

  );

}

export default ArticleCard;