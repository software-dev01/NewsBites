import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {

  return (

    <div className="flex min-h-screen">

      <AdminSidebar />

      <div className="flex-1 p-8 bg-gray-100">

        <Outlet />

      </div>

    </div>

  );

}

export default AdminLayout;