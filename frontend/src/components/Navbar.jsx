import { Bookmark, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {

  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name;



  const logoutHandler = () => {

    localStorage.clear();

    toast.success("Logged out successfully");

    navigate("/");

  };


  return (

    <div className="bg-white shadow-sm sticky top-0 z-20">

      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/feed")}
        >
          <span className="text-2xl">📰</span>

          <h1 className="text-xl font-bold text-gray-800">
            News Aggregator
          </h1>

        </div>


        {/* Right Actions */}

        <div className="flex items-center gap-4">


          {/* Saved */}

          <button
            onClick={() => navigate("/saved")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            <Bookmark size={18} />
            Saved
          </button>


          {/* Username */}

          <div className="flex items-center gap-2 text-gray-700">

            <User size={18} />

            <span className="font-medium">
              {name}
            </span>

          </div>


          {/* Logout */}

          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

    </div>

  );

}

export default Navbar;