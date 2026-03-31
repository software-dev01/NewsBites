import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

import {
  Calendar,
  Newspaper,
  Bookmark,
  ExternalLink
} from "lucide-react";

function ArticleDetails() {

  const { id } = useParams();


  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");



 const fetchArticle = useCallback(async () => {

    try {

      setLoading(true);

      const res = await API.get(`/articles/${id}`);

      setArticle(res.data);

      setSaved(res.data.isSaved || false);

    } catch (err) {

      const message =
        err.response?.data?.message ||
        "Failed to load article";

      setError(message);

      toast.error(message);

    } finally {

      setLoading(false);

    }

}, [id]);

 useEffect(() => {

  if (!id) {
    setError("Invalid article ID");
    setLoading(false);
    return;
  }

  fetchArticle();

}, [id, fetchArticle]);

  //  TOGGLE SAVE / UNSAVE

  const toggleSave = async () => {

    try {

      setLoading(true);

      await API.post(`/user/save/${article._id}`);

      if (!saved) {
        toast.success("Article saved");
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



  if (loading)
    return (
      <div className="flex justify-center mt-32 text-lg font-semibold">
        Loading article...
      </div>
    );


  if (error)
    return (
      <div className="flex flex-col items-center mt-32 gap-4">

        <p className="text-red-500 text-lg">{error}</p>

        <button
          onClick={fetchArticle}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Retry
        </button>

      </div>
    );


  return (

    <div className="min-h-screen from-gray-50 to-white py-12 px-4">

      <div className="max-w-4xl mx-auto space-y-6">


        {/* ARTICLE CARD */}

        <div className="bg-white rounded-2xl p-8 space-y-6">

          {/* CATEGORY */}

          <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
            {article.category || "General"}
          </span>


          {/* TITLE */}

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">

            {article.title}

          </h1>


          {/* META */}

          <div className="flex flex-wrap gap-6 text-gray-500 text-sm">

            <div className="flex items-center gap-1">
              <Calendar size={16} />
              {
                article.publicationDate &&
                new Date(article.publicationDate).toLocaleString()
              }
            </div>

            <div className="flex items-center gap-1">
              <Newspaper size={16} />
              {article.sourceAgent?.name || "Unknown"}
            </div>

          </div>


          {/* DESCRIPTION */}

          <p className="text-lg text-gray-700 leading-relaxed">

            {article.description || "No description available"}

          </p>


          {/* ACTION BAR */}

          <div className="flex flex-wrap gap-4 pt-4 border-t">

            {/* SAVE BUTTON */}

            <button
              onClick={toggleSave}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg transition text-sm font-medium
                ${saved
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
                }
              `}
            >

              <Bookmark
                size={18}
                fill={saved ? "currentColor" : "none"}
              />

              {saved ? "Saved" : "Save"}

            </button>


            {/* ORIGINAL LINK */}

            <a
              href={article.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition text-sm font-medium"
            >
              Read Original Source

              <ExternalLink size={16} />
            </a>

          </div>

        </div>




      </div>

    </div>

  );

}

export default ArticleDetails;