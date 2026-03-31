import { BadgeCheck, ExternalLink, Megaphone, Tag } from "lucide-react";
import { useEffect } from "react";
import API from "../services/api";

function AdCard({ ad }) {


  useEffect(() => {

    const trackView = async () => {

      try {

        await API.post(`/ads/view/${ad._id}`);

      } catch (err) {

        console.log("Ad view tracking failed");

      }

    };

    if (ad?._id) {

      trackView();

    }

  }, [ad]);

  return (

    <div className="p-5 space-y-3 border border-indigo-100 bg-indigo-50/40 rounded-xl">

      {/* LABEL ROW */}

      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">

        <div className="flex items-center gap-2 text-xs font-medium">

          <span className="flex items-center gap-1 bg-indigo-100 text-indigo-600 px-2 py-1 rounded-md">

            <Megaphone size={12} />

            Ad

          </span>

          <span className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-md">

            <BadgeCheck size={12} />

            Sponsored

          </span>

        </div>

        {

          ad.category && (

            <span className="flex items-center gap-1 bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-md">

              <Tag size={12} />

              {ad.category}

            </span>

          )

        }

      </div>


      {/* TITLE */}

      {

        ad.title && (

          <h3 className="text-lg font-semibold text-gray-800">

            {ad.title}

          </h3>

        )

      }


      {/* IMAGE */}

      {

        (ad.imageUrl || ad.image) && (

          <img
            src={ad.imageUrl || ad.image}
            alt={ad.title || "Advertisement"}
            className="rounded-lg w-full object-cover"
          />

        )

      }


      {/* CTA */}

      <a
        href={ad.targetLink || ad.url}
        target="_blank"
        rel="noreferrer"

        onClick={async () => {

          try {

            await API.post(`/ads/click/${ad._id}`);

          } catch (err) {

            console.log("Ad click tracking failed");

          }

        }}

        className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline"
      >

        Visit Sponsor

        <ExternalLink size={14} />

      </a>

    </div>

  );

}

export default AdCard;