import { useCallback, useEffect, useState } from "react";
import API from "../services/api";
import ArticleCard from "../components/ArticleCard";
import AdCard from "../components/AdCard";
import { useNavigate } from "react-router-dom";

function Feed() {

  const navigate = useNavigate();

  const [feed, setFeed] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const [mode, setMode] = useState("for-you");


  const fetchFeed = useCallback(async (pageNumber) => {
    try {
      setLoading(true);
      const endpoint =
        mode === "for-you"
          ? `/user/for-you?page=${pageNumber}&limit=${limit}`
          : `/feed?page=${pageNumber}&limit=${limit}`;

      const res = await API.get(endpoint);

      if (res.data.length === 0) {
        setHasMore(false);
        return;
      }

      setFeed(prev => [...prev, ...res.data]);

    } catch (err) {

      setError(
        err.response?.data?.message || "Failed to load feed"
      );

    } finally {

      setLoading(false);

    }
  }, [mode]);



  useEffect(() => {
    fetchFeed(page);
  }, [page, fetchFeed]);



  useEffect(() => {

    setFeed([]);

    setPage(1);

    setHasMore(true);

  }, [mode]);


  const loadMore = () => {
    setPage(prev => prev + 1);
  };


  if (loading && page === 1) {

    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading feed...
        </div>
      </div>
    );

  }


  if (error) {

    return (
      <div className="flex justify-center items-center min-h-screen">

        <div className="bg-red-100 text-red-600 px-6 py-4 rounded-xl shadow-md">

          {error}

        </div>

      </div>

    );

  }



  return (

    <div className="space-y-6">


      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold text-gray-800">
            Your Personalized Feed
          </h1>

          <p className="text-sm text-gray-500">
            Based on your selected interests
          </p>

        </div>


        <button
          onClick={() => navigate("/categories")}
          className="text-sm text-indigo-600 hover:underline"
        >
          Change Interests
        </button>

      </div>

      <div className="flex gap-4 mb-6">

        <button
          onClick={() => setMode("for-you")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition
      ${mode === "for-you"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600"
            }`}
        >
          For You
        </button>


        <button
          onClick={() => setMode("explore")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition
      ${mode === "explore"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600"
            }`}
        >
          Explore
        </button>

      </div>


      {!loading && feed.length === 0 && 

      <div className="flex justify-center items-center h-[50vh]">

        <div className="text-gray-500 text-lg">

          {mode === "for-you"
            ? "No articles match your selected interests yet."
            : "No articles available at the moment."}

        </div>

      </div>

      }


      {

        feed.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
          >

            {

              item.type === "article"

                ?

                <ArticleCard article={item.data} />

                :

                <AdCard ad={item.data} />

            }

          </div>

        ))

      }


      {/* Load More Button */}

      {
        loading && page > 1 ? (

          <div className="flex justify-center">
            <div className="text-gray-500 animate-pulse">
              Loading more articles...
            </div>
          </div>

        ) : hasMore ? (

          <div className="flex justify-center">

            <button
              onClick={loadMore}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Load More
            </button>

          </div>

        ) : null
      }

    </div>

  );

}

export default Feed;