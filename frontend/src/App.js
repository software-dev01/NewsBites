import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CategorySelection from "./pages/CategorySelection";
import Feed from "./pages/Feed";
import ArticleDetails from "./pages/ArticleDetails";
import SavedArticles from "./pages/SavedArticles";

// Admin pages
import Dashboard from "./admin/Dashboard";
import Agents from "./admin/Agents";
import Ads from "./admin/Ads";

import { Toaster } from "react-hot-toast";
import AdminLayout from "./admin/layout/AdminLayout";
import Analytics from "./admin/Analytics";

function App() {

  return (

    <BrowserRouter>

      <Toaster position="top-right" />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />


        {/* ALL LOGGED-IN USERS (ADMIN + USER) */}
        <Route element={<ProtectedRoute />}>

          <Route element={<Layout />}>

            <Route path="/categories" element={<CategorySelection />} />

            <Route path="/feed" element={<Feed />} />

            <Route
              path="/article/:id"
              element={<ArticleDetails />}
            />

            <Route
              path="/saved"
              element={<SavedArticles />}
            />

          </Route>

        </Route>


        {/* ADMIN ONLY ROUTES */}
        <Route element={<ProtectedRoute adminOnly={true} />}>

          <Route element={<AdminLayout />}>

            <Route
              path="/admin/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/admin/agents"
              element={<Agents />}
            />

            <Route
              path="/admin/ads"
              element={<Ads />}
            />

            <Route
              path="/admin/analytics"
              element={<Analytics />}
            />

            <Route
              path="/admin/analytics/:adId"
              element={<Analytics />}
            />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;