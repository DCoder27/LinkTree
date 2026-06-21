import { useEffect, useState } from "react";
import { getLinks, createLink, deleteLink } from "../services/linkService";

const Dashboard = () => {
  const [links, setLinks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });

  const fetchLinks = async () => {
    try {
      const data = await getLinks();

      setLinks(data.links);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const data = await createLink(formData);

      setLinks((prev) => [...prev, data.link]);

      setFormData({
        title: "",
        url: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLink(id);

      setLinks((prev) => prev.filter((link) => link._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <form onSubmit={handleCreate} className="space-y-4 mb-10">
        <input
          type="text"
          name="title"
          placeholder="Link Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="url"
          placeholder="https://..."
          value={formData.url}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Add Link
        </button>
      </form>

      <div className="grid gap-4">
        {links.map((link) => (
          <div key={link._id} className="border p-4 rounded-lg">
            <h2 className="font-semibold text-lg">{link.title}</h2>

            <p>{link.url}</p>

            <p>Clicks: {link.clicks}</p>
            <button onClick={() => handleDelete(link._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
