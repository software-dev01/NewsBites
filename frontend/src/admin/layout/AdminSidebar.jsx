import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  Megaphone,
  LogOut,
  Shield,
  BarChart3
} from "lucide-react";

function AdminSidebar() {

  const location = useLocation();
  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");

  };


  const linkStyle = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium
     ${location.pathname === path
      ? "bg-indigo-600 text-white shadow"
      : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;


  return (

    <div className="w-64 bg-gray-900 text-white flex flex-col justify-between min-h-screen">

      {/* TOP SECTION */}

      <div className="p-6 space-y-6">

        {/* BRAND */}

        <div className="flex items-center gap-2">

          <Shield size={26} className="text-indigo-500" />

          <h2 className="text-xl font-bold tracking-wide">

            NewsBite Admin

          </h2>

        </div>


        {/* NAVIGATION */}

        <nav className="space-y-2">

          <Link
            to="/admin/dashboard"
            className={linkStyle("/admin/dashboard")}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>


          <Link
            to="/admin/agents"
            className={linkStyle("/admin/agents")}
          >
            <Newspaper size={18} />
            Agents
          </Link>


          <Link
            to="/admin/ads"
            className={linkStyle("/admin/ads")}
          >
            <Megaphone size={18} />
            Campaigns
          </Link>

          <Link
            to="/admin/analytics"
            className={linkStyle("/admin/analytics")}
          >
            <BarChart3 size={18} />
            Analytics
          </Link>

        </nav>

      </div>


      {/* FOOTER SECTION */}

      <div className="p-6 border-t border-gray-800">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>

  );

}

export default AdminSidebar;