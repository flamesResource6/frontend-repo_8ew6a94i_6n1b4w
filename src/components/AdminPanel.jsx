import React, { useEffect, useState } from 'react';

const Field = ({ label, ...props }) => (
  <label className="block text-sm font-medium text-slate-200">
    {label}
    <input
      {...props}
      className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </label>
);

const TextArea = ({ label, ...props }) => (
  <label className="block text-sm font-medium text-slate-200">
    {label}
    <textarea
      {...props}
      className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </label>
);

const AdminPanel = () => {
  const base = import.meta.env.VITE_BACKEND_URL;

  // Profile
  const [profile, setProfile] = useState({ name: '', bio: '', image: '', location: '', website: '' });
  const [savingProfile, setSavingProfile] = useState(false);

  // Video
  const [video, setVideo] = useState({ title: '', url: '', description: '' });
  const [savingVideo, setSavingVideo] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${base}/profile`);
        if (res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length) setProfile({
            name: data.name || '',
            bio: data.bio || '',
            image: data.image || '',
            location: data.location || '',
            website: data.website || '',
          });
        }
      } catch (_) {}
    };
    load();
  }, [base]);

  const saveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setFeedback('');
    try {
      const res = await fetch(`${base}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error('Failed');
      setFeedback('Profile saved');
    } catch (e) {
      setFeedback('Could not save profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const saveVideo = async (e) => {
    e.preventDefault();
    setSavingVideo(true);
    setFeedback('');
    try {
      const res = await fetch(`${base}/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video),
      });
      if (!res.ok) throw new Error('Failed');
      setFeedback('Video added');
      setVideo({ title: '', url: '', description: '' });
    } catch (e) {
      setFeedback('Could not add video');
    } finally {
      setSavingVideo(false);
    }
  };

  return (
    <section id="admin" className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Admin Panel</h2>

      {feedback && <div className="mb-4 text-sm text-slate-200">{feedback}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={saveProfile} className="rounded-2xl bg-white/5 p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Profile</h3>
          <div className="space-y-4">
            <Field label="Name" value={profile.name} onChange={(e)=>setProfile(p=>({...p, name:e.target.value}))} placeholder="Your name" />
            <TextArea label="Bio" rows={4} value={profile.bio} onChange={(e)=>setProfile(p=>({...p, bio:e.target.value}))} placeholder="Short bio" />
            <Field label="Image URL" value={profile.image} onChange={(e)=>setProfile(p=>({...p, image:e.target.value}))} placeholder="https://..." />
            <Field label="Location" value={profile.location} onChange={(e)=>setProfile(p=>({...p, location:e.target.value}))} placeholder="City, Country" />
            <Field label="Website" value={profile.website} onChange={(e)=>setProfile(p=>({...p, website:e.target.value}))} placeholder="https://your-site.com" />
          </div>
          <button disabled={savingProfile} className="mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 disabled:opacity-50">
            {savingProfile ? 'Saving...' : 'Save Profile'}
          </button>
        </form>

        <form onSubmit={saveVideo} className="rounded-2xl bg-white/5 p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Add Video</h3>
          <div className="space-y-4">
            <Field label="Title" value={video.title} onChange={(e)=>setVideo(v=>({...v, title:e.target.value}))} placeholder="Project title" />
            <Field label="Video Link (Drive/YouTube/Vimeo)" value={video.url} onChange={(e)=>setVideo(v=>({...v, url:e.target.value}))} placeholder="Paste link" />
            <TextArea label="Description" rows={3} value={video.description} onChange={(e)=>setVideo(v=>({...v, description:e.target.value}))} placeholder="Short description" />
            <p className="text-xs text-slate-400">For Google Drive: use a link like https://drive.google.com/file/d/FILE_ID/view</p>
          </div>
          <button disabled={savingVideo} className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600 disabled:opacity-50">
            {savingVideo ? 'Adding...' : 'Add Video'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminPanel;
