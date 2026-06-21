import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const backendApiUrl =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await api.get(`/profile/${username}`);
        setProfile(data);
      } catch (err) {
        setError(err.response?.data?.message || "Profile not found");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  if (loading) return <div className="p-10">Loading profile...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{profile.username}</h1>
      <div className="grid gap-4">
        {profile.links.map((link) => {
          const clickUrl = `${backendApiUrl}/profile/click/${link._id}`;

          return (
            <a
              key={link._id}
              href={clickUrl}
              className="block border p-4 rounded-lg hover:bg-slate-50"
              target="_blank"
              rel="noreferrer"
            >
              <h2 className="font-semibold text-lg">{link.title}</h2>
              <p className="text-slate-600">{link.url}</p>
              <p className="text-xs text-slate-400 mt-2">
                Direct redirect: {clickUrl}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default PublicProfile;
