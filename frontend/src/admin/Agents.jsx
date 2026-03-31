import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Newspaper,
  Plus,
  Trash2,
  Pencil
} from "lucide-react";
import toast from "react-hot-toast";

function Agents() {

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    rssUrl: "",
    category: "",
    fetchInterval: 10,
    active: true
  });
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {

    fetchAgents();

  }, []);


  const fetchAgents = async () => {

    try {

      const res = await API.get("/admin/agents");

      setAgents(res.data);

    } catch (err) {

      console.error("Fetch agents failed");

    } finally {

      setLoading(false);

    }

  };

  const createAgent = async () => {


    if (!form.name.trim())
      return toast.error("Agent name is required");

    if (!form.rssUrl.trim())
      return toast.error("RSS URL is required");

    if (!form.category.trim())
      return toast.error("Category is required");

    if (!form.fetchInterval)
      return toast.error("Fetch interval is required");

    try {

      await API.post("/admin/agents", form);

      toast.success("Agent created successfully");

      setShowModal(false);

      setForm({
        name: "",
        rssUrl: "",
        category: "",
        fetchInterval: 10,
        active: true
      });

      fetchAgents();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Agent creation failed"
      );

    }

  };

  const openEditModal = (agent) => {
    console.log('agent:>', agent)

    setForm({
      name: agent.name,
      rssUrl: agent.rssUrl,
      category: agent.category,
      fetchInterval: agent.fetchInterval,
      active: agent.active
    });

    setEditingId(agent._id);

    setShowModal(true);

  };

  const updateAgent = async () => {

    if (!form.name.trim())
      return toast.error("Agent name is required");

    if (!form.rssUrl.trim())
      return toast.error("RSS URL is required");

    if (!form.category.trim())
      return toast.error("Category is required");

    if (!form.fetchInterval)
      return toast.error("Fetch interval is required");

    try {

      await API.put(
        `/admin/agents/${editingId}`,
        form
      );

      toast.success("Agent updated successfully ✏️");

      setShowModal(false);

      setEditingId(null);

      setForm({
        name: "",
        rssUrl: "",
        category: "",
        fetchInterval: 10,
        active: true
      });

      fetchAgents();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Update failed"
      );

    }

  };

  const deleteAgent = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this agent?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/admin/agents/${id}`);

      toast.success("Agent deleted successfully.");

      fetchAgents();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed to delete agent"
      );

    }

  };


  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-2">

          <Newspaper className="text-indigo-600" />

          <h1 className="text-2xl font-bold text-gray-800">

            RSS Agents

          </h1>

        </div>


        {/* CREATE BUTTON */}

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">

          <Plus size={16} />

          Add Agent

        </button>

      </div>



      {/* TABLE */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        {

          loading

            ?

            <div className="p-6 text-gray-500">

              Loading agents...

            </div>

            :

            agents.length === 0

              ?

              <div className="p-6 text-gray-500">

                No agents created yet

              </div>

              :

              <table className="w-full">

                <thead className="bg-gray-50 text-left text-sm text-gray-500">

                  <tr>

                    <th className="p-4">Name</th>

                    <th className="p-4">Category</th>

                    <th className="p-4">Interval</th>

                    <th className="p-4">Status</th>

                    <th className="p-4">Actions</th>

                  </tr>

                </thead>


                <tbody>

                  {

                    agents.map(agent => (

                      <tr
                        key={agent._id}
                        className="border-t hover:bg-gray-50"
                      >

                        <td className="p-4 font-medium">

                          {agent.name}

                        </td>


                        <td className="p-4 text-gray-600">

                          {agent.category}

                        </td>


                        <td className="p-4 text-gray-600">

                          {agent.fetchInterval} mins

                        </td>


                        <td className="p-4">

                          <span
                            className={`px-2 py-1 text-xs rounded-full
                            ${agent.active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                              }`}
                          >

                            {agent.active ? "Active" : "Inactive"}

                          </span>

                        </td>


                        <td className="p-4 flex gap-3">

                          {/* EDIT */}

                          <button
                            onClick={() => openEditModal(agent)}
                            className="text-indigo-600 hover:text-indigo-800">

                            <Pencil size={16} />

                          </button>


                          {/* DELETE */}

                          <button
                            onClick={() => deleteAgent(agent._id)}
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

                {editingId ? "Edit RSS Agent" : "Create RSS Agent"}

              </h2>


              <input
                placeholder="Agent Name"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                value={form.name}
              />


              <input
                placeholder="RSS URL"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, rssUrl: e.target.value })
                }
                value={form.rssUrl}
              />


              {/* CATEGORY */}

              <select
                className="w-full border px-3 py-2 rounded"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >

                <option value="">Select Category</option>
                <option>Tech</option>
                <option>Business</option>
                <option>Sports</option>
                <option>World</option>
                <option>Politics</option>
                <option>Entertainment</option>

              </select>


              <input
                placeholder="Fetch Interval (minutes)"
                type="number"
                className="w-full border px-3 py-2 rounded"
                value={form.fetchInterval}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fetchInterval: e.target.value
                  })
                }
              />

              <label className="flex items-center gap-2 text-sm text-gray-700">

                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      active: e.target.checked
                    })
                  }
                />

                Active Agent (enable RSS fetching)

              </label>

              <div className="flex justify-end gap-2">

                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setForm({
                      name: "",
                      rssUrl: "",
                      category: "",
                      fetchInterval: 10,
                      active: true
                    });
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>


                <button
                  onClick={editingId ? updateAgent : createAgent}
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

export default Agents;