import {
    Newspaper,
    Megaphone,
    BarChart3,
    ArrowRight,
    Shield
} from "lucide-react";

import { Link } from "react-router-dom";

function Dashboard() {

    const adminName =
        JSON.parse(localStorage.getItem("user"))?.name || "Admin";


    return (

        <div className="space-y-8">

            {/* HEADER */}

            <div>
                <div className="flex items-center gap-3">

                    <div className="bg-indigo-100 p-2 rounded-lg">

                        <Shield size={26} className="text-indigo-600" />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">

                            Welcome back, {adminName}

                        </h1>

                        <p className="text-gray-500 text-sm">

                            Admin Control Center

                        </p>

                    </div>

                </div>

                {/* <p className="text-gray-500 mt-1">

                    Manage feeds, campaigns, and analytics from here

                </p> */}

            </div>



            {/* KPI CARDS */}

            <div className="grid md:grid-cols-3 gap-6">

                {/* AGENTS */}

                <Link
                    to="/admin/agents"
                    className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition group"
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 text-sm">

                                RSS Agents

                            </p>

                            <h2 className="text-xl font-bold text-gray-800">

                                Manage Sources

                            </h2>

                        </div>

                        <Newspaper
                            size={30}
                            className="text-indigo-500 group-hover:scale-110 transition"
                        />

                    </div>


                    <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium">

                        Open Agents

                        <ArrowRight size={16} className="ml-2" />

                    </div>

                </Link>



                {/* ADS */}

                <Link
                    to="/admin/ads"
                    className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition group"
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 text-sm">

                                Campaign Manager

                            </p>

                            <h2 className="text-xl font-bold text-gray-800">

                                Manage Ads

                            </h2>

                        </div>

                        <Megaphone
                            size={30}
                            className="text-indigo-500 group-hover:scale-110 transition"
                        />

                    </div>


                    <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium">

                        Open Campaigns

                        <ArrowRight size={16} className="ml-2" />

                    </div>

                </Link>



                {/* ANALYTICS */}

                <Link
                    to="/admin/analytics"
                    className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition group"
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 text-sm">

                                Performance Analytics

                            </p>

                            <h2 className="text-xl font-bold text-gray-800">

                                CTR Insights

                            </h2>

                        </div>

                        <BarChart3
                            size={30}
                            className="text-indigo-500 group-hover:scale-110 transition"
                        />

                    </div>


                    <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium">

                        View Analytics

                        <ArrowRight size={16} className="ml-2" />

                    </div>

                </Link>

            </div>



            {/* QUICK INFO PANEL */}

            <div className="bg-white shadow rounded-xl p-6">

                <h2 className="text-lg font-semibold text-gray-800 mb-2">

                    Admin Tips

                </h2>

                <p className="text-gray-500 text-sm">

                    Add RSS agents to automatically fetch articles.
                    Create campaigns to inject ads into feeds and track impressions & clicks.

                </p>

            </div>

        </div>

    );

}

export default Dashboard;