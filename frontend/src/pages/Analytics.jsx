import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
} from "../services/linkService";

const Analytics = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [links, setLinks] = useState([]);
  const [formData, setFormData] = useState({ title: "", url: "" });
  const [editing, setEditing] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [editData, setEditData] = useState({ title: "", url: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [{ data: analyticsData }, linksData] = await Promise.all([
          api.get("/links/analytics"),
          getLinks(),
        ]);

        setAnalytics(analyticsData);
        setLinks(linksData.links);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const refreshLinks = async () => {
    const { links: refreshedLinks } = await getLinks();
    setLinks(refreshedLinks);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { link } = await createLink(formData);
      setLinks((prev) => [link, ...prev]);
      setFormData({ title: "", url: "" });
      setAnalytics((prev) => ({
        ...prev,
        totalLinks: prev.totalLinks + 1,
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create link");
    }
  };

  const handleEdit = (link) => {
    setEditing(true);
    setEditingLinkId(link._id);
    setEditData({ title: link.title, url: link.url });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateLink(editingLinkId, editData);
      setLinks((prev) =>
        prev.map((link) => (link._id === editingLinkId ? data : link)),
      );
      setEditing(false);
      setEditingLinkId(null);
      setEditData({ title: "", url: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update link");
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditingLinkId(null);
    setEditData({ title: "", url: "" });
  };

  const handleDelete = async (id) => {
    try {
      await deleteLink(id);
      setLinks((prev) => prev.filter((link) => link._id !== id));
      setAnalytics((prev) => ({
        ...prev,
        totalLinks: prev.totalLinks - 1,
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete link");
    }
  };

  const handleViewProfile = () => {
    if (user?.username) {
      navigate(`/${user.username}`);
    }
  };

  if (loading) return <div className="p-10">Loading analytics...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  const backendHost =
    import.meta.env.VITE_API_URL?.replace(/\/api$/, "") ||
    window.location.origin;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">Analytics</h1>
          <p className="text-sm text-slate-500">
            Welcome, {user?.username || "user"}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/${user?.username}`)}
            className="border border-slate-300 text-slate-800 px-5 py-3 rounded-lg hover:bg-slate-100"
          >
            View Public Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-black text-white px-5 py-3 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid gap-4 mb-8">
        <div className="border p-6 rounded-lg">
          <p className="text-sm text-slate-500">Total links</p>
          <p className="text-3xl font-semibold">{analytics.totalLinks}</p>
        </div>
        <div className="border p-6 rounded-lg">
          <p className="text-sm text-slate-500">Total clicks</p>
          <p className="text-3xl font-semibold">{analytics.totalClicks}</p>
        </div>
        <div className="border p-6 rounded-lg bg-slate-50">
          <p className="text-sm text-slate-500 mb-2">Public profile URL</p>
          <p className="text-sm break-all">{`${window.location.origin}/${user?.username}`}</p>
        </div>
        <div className="border p-6 rounded-lg bg-slate-50">
          <p className="text-sm text-slate-500 mb-2">
            Direct click redirection base
          </p>
          <p className="text-sm break-all">{`${backendHost}/api/profile/click/:linkId`}</p>
        </div>
      </div>

      <div className="border p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Create a new public link
        </h2>
        <form onSubmit={handleCreate} className="grid gap-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Link title"
            className="w-full border p-3 rounded-lg"
          />
          <input
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full border p-3 rounded-lg"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Create link
          </button>
        </form>
      </div>

      <div className="border p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Your links</h2>
        {links.length === 0 ? (
          <p className="text-slate-500">You haven't created any links yet.</p>
        ) : (
          <div className="space-y-4">
            {links.map((link) => {
              const publicClickLink = `${backendHost}/api/profile/click/${link._id}`;

              return (
                <div key={link._id} className="border p-4 rounded-lg">
                  {editing && editingLinkId === link._id ? (
                    <form onSubmit={handleUpdate} className="grid gap-3">
                      <input
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                        className="w-full border p-3 rounded-lg"
                      />
                      <input
                        name="url"
                        value={editData.url}
                        onChange={handleEditChange}
                        className="w-full border p-3 rounded-lg"
                      />
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="bg-black text-white px-4 py-2 rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="border px-4 py-2 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {link.title}
                          </h3>
                          <p className="text-slate-600 break-all">{link.url}</p>
                          <p className="text-sm text-slate-500">
                            Clicks: {link.clicks}
                          </p>
                          <p className="text-sm text-slate-500 mt-2">
                            Public:{" "}
                            <a
                              href={publicClickLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 underline"
                            >
                              {publicClickLink}
                            </a>
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(link)}
                            className="bg-slate-800 text-white px-4 py-2 rounded-lg"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(link._id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
