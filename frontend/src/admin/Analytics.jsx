import { useEffect, useState } from "react";
import API from "../services/api";

import {
  BarChart3,
  Eye,
  MousePointerClick
} from "lucide-react";
import { useParams } from "react-router-dom";

function Analytics() {

  const [ads, setAds] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  const { adId } = useParams();


  useEffect(() => {

    if (adId) {
      fetchSingleAnalytics(adId);
    } else {
      fetchAds();
    }

  }, []);


  const fetchSingleAnalytics = async (id) => {

    try {

      const adRes = await API.get("/admin/ads");

      const selectedAd = adRes.data.find(a => a._id === id);

      setAds([selectedAd]);

      const analyticsRes = await API.get(
        `/admin/ads/${id}/analytics`
      );

      setAnalytics({
        [id]: analyticsRes.data
      });

    } catch {

      console.error("Failed to load campaign analytics");

    } finally {

      setLoading(false);

    }

  };

  const fetchAds = async () => {

    try {

      const res = await API.get("/admin/ads");

      setAds(res.data);

      fetchAnalytics(res.data);

    } catch {

      console.error("Failed to fetch ads");

    }

  };


  const fetchAnalytics = async (adsList) => {

    try {

      const analyticsData = {};

      for (let ad of adsList) {

        const res = await API.get(
          `/admin/ads/${ad._id}/analytics`
        );

        analyticsData[ad._id] = res.data;

      }

      setAnalytics(analyticsData);

    } catch {

      console.error("Analytics fetch failed");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex items-center gap-2">

        <BarChart3 className="text-indigo-600" />

        <h1 className="text-2xl font-bold text-gray-800">

          Campaign Analytics

        </h1>

      </div>


      {/* TABLE */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        {

          loading

            ?

            <div className="p-6 text-gray-500">

              Loading analytics...

            </div>

            :

            ads.length === 0

              ?

              <div className="p-6 text-gray-500">

                No campaigns available

              </div>

              :

              <table className="w-full">

                <thead className="bg-gray-50 text-left text-sm text-gray-500">

                  <tr>

                    <th className="p-4">Campaign</th>

                    <th className="p-4">Category</th>

                    <th className="p-4">Views</th>

                    <th className="p-4">Clicks</th>

                    <th className="p-4">CTR</th>

                  </tr>

                </thead>


                <tbody>

                  {

                    ads.map(ad => (

                      <tr
                        key={ad._id}
                        className="border-t hover:bg-gray-50"
                      >

                        {/* CAMPAIGN */}

                        <td className="p-4 flex items-center gap-3">

                          <img
                            src={ad.imageUrl}
                            alt="campaign"
                            className="w-16 h-10 rounded object-cover"
                          />

                          <span className="font-medium">

                            {ad.title}

                          </span>

                        </td>


                        {/* CATEGORY */}

                        <td className="p-4 text-gray-600">

                          {ad.category || "All Users"}

                        </td>


                        {/* VIEWS */}

                        <td className="p-4">

                          <div className="flex items-center gap-1 text-gray-700">

                            <Eye size={16} />

                            {

                              analytics[ad._id]?.totalViews || 0

                            }

                          </div>

                        </td>


                        {/* CLICKS */}

                        <td className="p-4">

                          <div className="flex items-center gap-1 text-gray-700">

                            <MousePointerClick size={16} />

                            {

                              analytics[ad._id]?.totalClicks || 0

                            }

                          </div>

                        </td>


                        {/* CTR */}

                        <td className="p-4 font-semibold text-indigo-600">

                          {

                            analytics[ad._id]?.ctr || "0%"

                          }

                        </td>

                      </tr>

                    ))

                  }

                </tbody>

              </table>

        }

      </div>

    </div>

  );

}

export default Analytics;