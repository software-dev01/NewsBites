import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-6">

        <Outlet />

      </div>

    </div>

  );

}

export default Layout;