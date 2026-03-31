import { useEffect, useState } from "react";
import { BookmarkCheck, RefreshCcw, ExternalLink, BookmarkMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function SavedArticles() {

  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    fetchSaved();

  }, []);


  const fetchSaved = async () => {

    try {

      setLoading(true);

      const res = await API.get("/user/saved");

      setArticles(res.data);

    } catch (err) {

      const message =
        err.response?.data?.message ||
        "Failed to load saved articles";

      setError(message);

      toast.error(message);

    } finally {

      setLoading(false);

    }

  };

  const removeBookmark = async (id) => {

    try {

      await API.post(`/user/save/${id}`);

      toast.success("Removed from saved");

      setArticles(prev =>
        prev.filter(article => article._id !== id)
      );

    } catch {

      toast.error("Remove failed");

    }

  };


  if (loading) {

    return (

      <div className="flex justify-center mt-32 text-gray-600 text-lg font-semibold animate-pulse">

        Loading saved articles...

      </div>

    );

  }


  if (error) {

    return (

      <div className="flex flex-col items-center mt-32 gap-4">

        <p className="text-red-500 text-lg">{error}</p>

        <button
          onClick={fetchSaved}
          className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <RefreshCcw size={16} />
          Retry
        </button>

      </div>

    );

  }


  return (

    <div className="max-w-4xl mx-auto">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-2">

          <BookmarkCheck className="text-indigo-600" />

          <h1 className="text-2xl font-bold text-gray-800">

            Saved Articles

          </h1>

        </div>


        <button
          onClick={fetchSaved}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <RefreshCcw size={16} />
          Refresh
        </button>

      </div>


      {/* EMPTY STATE */}

      {articles.length === 0 && (

        <div className="text-center mt-20 text-gray-400">

          <BookmarkCheck
            size={48}
            className="mx-auto mb-4"
          />

          <p className="text-lg">

            No saved articles yet

          </p>

          <button
            onClick={() => navigate("/feed")}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Browse Articles
          </button>

        </div>

      )}


      {/* SAVED ARTICLES LIST */}

      <div className="space-y-6">

        {

          articles.map(article => (

            <div
              key={article._id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
            >

              <h2 className="text-lg font-semibold text-gray-800 mb-2">

                {article.title}

              </h2>


              <p className="text-gray-600 text-sm mb-4">

                {article.category}

              </p>


              <div className="flex gap-3 flex-wrap">

                <button
                  onClick={() =>
                    navigate(`/article/${article._id}`)
                  }
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  View Article
                </button>


                <a
                  href={article.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  <ExternalLink size={16} />
                  Source
                </a>


                <button
                  onClick={() => removeBookmark(article._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <BookmarkMinus size={16} />
                  Remove
                </button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default SavedArticles;