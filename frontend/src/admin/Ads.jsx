import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Megaphone,
  Plus,
  Trash2,
  Pencil,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Ads() {

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    category: "",
    targetLink: "",
    active: true
  });

  const navigate = useNavigate();


  useEffect(() => {

    fetchAds();

  }, []);


  const fetchAds = async () => {

    try {

      const res = await API.get("/admin/ads");

      setAds(res.data);

    } catch {

      console.error("Failed to fetch ads");

    } finally {

      setLoading(false);

    }

  };

  const createAd = async () => {

    if (!form.title.trim())
      return toast.error("Campaign title is required");

    if (!form.imageUrl.trim())
      return toast.error("Image URL is required");

    if (!form.targetLink.trim())
      return toast.error("Target link is required");

    try {

      await API.post("/admin/ads", form);

      toast.success("Campaign created successfully");

      resetForm();

      fetchAds();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Campaign creation failed"
      );

    }

  };

  const openEditModal = (ad) => {

    setForm({
      title: ad.title,
      imageUrl: ad.imageUrl,
      category: ad.category || "",
      targetLink: ad.targetLink,
      active: ad.active
    });

    setEditingId(ad._id);

    setShowModal(true);

  };

  const updateAd = async () => {

    if (!form.title.trim())
      return toast.error("Campaign title is required");

    if (!form.imageUrl.trim())
      return toast.error("Image URL is required");

    if (!form.targetLink.trim())
      return toast.error("Target link is required");

    try {

      await API.put(
        `/admin/ads/${editingId}`,
        form
      );

      toast.success("Campaign updated successfully");

      resetForm();

      fetchAds();

    } catch (err) {

      toast.error("Update failed");

    }

  };

  const deleteAd = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this campaign?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/admin/ads/${id}`);

      toast.success("Campaign deleted");

      fetchAds();

    } catch {

      toast.error("Delete failed");

    }

  };

  const resetForm = () => {

    setShowModal(false);

    setEditingId(null);

    setForm({
      title: "",
      imageUrl: "",
      category: "",
      targetLink: "",
      active: true
    });

  };

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-2">

          <Megaphone className="text-indigo-600" />

          <h1 className="text-2xl font-bold text-gray-800">

            Campaign Manager

          </h1>

        </div>


        {/* CREATE BUTTON */}

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">

          <Plus size={16} />

          Create Campaign

        </button>

      </div>



      {/* TABLE */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        {

          loading

            ?

            <div className="p-6 text-gray-500">

              Loading campaigns...

            </div>

            :

            ads.length === 0

              ?

              <div className="p-6 text-gray-500">

                No campaigns created yet

              </div>

              :

              <table className="w-full">

                <thead className="bg-gray-50 text-left text-sm text-gray-500">

                  <tr>

                    <th className="p-4">Preview</th>

                    <th className="p-4">Title</th>

                    <th className="p-4">Category</th>

                    <th className="p-4">Status</th>

                    <th className="p-4">Analytics</th>

                    <th className="p-4">Actions</th>

                  </tr>

                </thead>


                <tbody>

                  {

                    ads.map(ad => (

                      <tr
                        key={ad._id}
                        className="border-t hover:bg-gray-50"
                      >

                        {/* IMAGE */}

                        <td className="p-4">

                          <img
                            src={ad.imageUrl}
                            alt="campaign"
                            className="w-16 h-10 object-cover rounded"
                          />

                        </td>


                        {/* TITLE */}

                        <td className="p-4 font-medium">

                          {ad.title}

                        </td>


                        {/* CATEGORY */}

                        <td className="p-4 text-gray-600">

                          {ad.category || "All Users"}

                        </td>


                        {/* STATUS */}

                        <td className="p-4">

                          <span
                            className={`px-2 py-1 text-xs rounded-full
                            ${ad.active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                              }`}
                          >

                            {ad.active ? "Active" : "Paused"}

                          </span>

                        </td>


                        {/* ANALYTICS BUTTON */}

                        <td className="p-4">

                          <button
                            title="View campaign analytics"
                            onClick={() => navigate(`/admin/analytics/${ad._id}`)}
                            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                          >
                            <BarChart3 size={16} />
                            View
                          </button>

                        </td>


                        {/* ACTIONS */}

                        <td className="p-4 flex gap-3">

                          <button
                            onClick={() => openEditModal(ad)}
                            className="text-indigo-600 hover:text-indigo-800">

                            <Pencil size={16} />

                          </button>


                          <button
                            onClick={() => deleteAd(ad._id)}
                            className="text-red-500 hover:text-red-700"
                          >

                            <Trash2 size={16} />

                          </button>

                        </td>

                      </tr>

                    ))

                  }

                </tbody>

              </table>

        }

      </div>

      {
        showModal && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-lg p-6 w-[420px] space-y-4">

              <h2 className="text-lg font-semibold">

                {editingId ? "Edit Campaign" : "Create Campaign"}

              </h2>


              {/* TITLE */}

              <input
                placeholder="Campaign Title"
                className="w-full border px-3 py-2 rounded"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />


              {/* IMAGE URL */}

              <input
                placeholder="Image URL"
                className="w-full border px-3 py-2 rounded"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm({ ...form, imageUrl: e.target.value })
                }
              />


              {/* CATEGORY */}

              <select
                className="w-full border px-3 py-2 rounded"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >

                <option value="">Target Category (optional)</option>

                <option>Tech</option>
                <option>Business</option>
                <option>Sports</option>
                <option>World</option>
                <option>Politics</option>
                <option>Entertainment</option>

              </select>


              {/* TARGET LINK */}

              <input
                placeholder="Target Link (redirect URL)"
                className="w-full border px-3 py-2 rounded"
                value={form.targetLink}
                onChange={(e) =>
                  setForm({ ...form, targetLink: e.target.value })
                }
              />


              {/* ACTIVE CHECKBOX */}

              <label className="flex items-center gap-2 text-sm text-gray-700">

                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) =>
                    setForm({ ...form, active: e.target.checked })
                  }
                />

                Campaign Active

              </label>


              {/* BUTTONS */}

              <div className="flex justify-end gap-2">

                <button
                  onClick={resetForm}
                  className="px-4 py-2 border rounded"
                >

                  Cancel

                </button>


                <button
                  onClick={editingId ? updateAd : createAd}
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >

                  {editingId ? "Update" : "Save"}

                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>

  );

}

export default Ads;