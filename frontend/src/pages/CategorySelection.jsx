import { useEffect, useState } from "react";
import { CheckCircle, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function CategorySelection() {

  const navigate = useNavigate();

  const categories = [
    "World",
    "Tech",
    "Business",
    "Sports",
    "Health",
    "Science"
  ];

  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    const fetchPreferences = async () => {

      try {

        const res = await API.get("/user/preferences");

        setSelected(res.data.preferences || []);

      } catch (err) {

        console.log("Could not load preferences");

      }

    };

    fetchPreferences();

  }, []);

  const toggleCategory = (category) => {

    if (selected.includes(category)) {

      setSelected(selected.filter(c => c !== category));

    } else {

      setSelected([...selected, category]);

    }

  };


  const savePreferences = async () => {

    if (!selected.length) {

      toast.error("Please select at least one category");

      return;

    }

    try {

      setLoading(true);

      await API.put("/user/preferences", {
        preferences: selected
      });

      toast.success("Preferences saved successfully");

      navigate("/feed");

    } catch (err) {

      toast.error("Failed to save preferences");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen from-gray-50 to-white flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl p-10 max-w-3xl w-full">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-800">

            Choose Your Interests

          </h1>

          <p className="text-gray-500 mt-2">

            Select categories to personalize your news feed

          </p>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {

            categories.map(category => (

              <button

                key={category}

                onClick={() => toggleCategory(category)}

                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200
      
  ${selected.includes(category)

                    ? "bg-indigo-100 text-indigo-700 border-indigo-400"

                    : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700"

                  }
`}
              >

                {

                  selected.includes(category)

                  && <CheckCircle size={18} className="animate-scaleIn" />

                }

                {category}

              </button>

            ))

          }

        </div>


        <div className="mt-8 flex justify-center">

          <button

            onClick={savePreferences}

            disabled={loading}

            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-60"

          >

            {

              loading

                ? <RefreshCcw className="animate-spin" size={18} />

                : "Save Preferences"

            }

          </button>

        </div>

      </div>

    </div>

  );

}

export default CategorySelection;
