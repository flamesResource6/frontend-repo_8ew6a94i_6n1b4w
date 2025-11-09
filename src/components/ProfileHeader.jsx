import React, { useEffect, useState } from 'react';

const ProfileHeader = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`${base}/profile`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data && Object.keys(data).length ? data : null);
        }
      } catch (_) {}
    };
    load();
  }, []);

  return (
    <div className="flex items-center gap-4">
      {profile?.image ? (
        <img src={profile.image} alt={profile.name} className="h-14 w-14 rounded-full object-cover border border-white/20" />
      ) : (
        <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">VE</div>
      )}
      <div>
        <h2 className="text-xl font-bold text-white">{profile?.name || 'Video Editor'}</h2>
        <p className="text-slate-300 text-sm">{profile?.bio || 'Crafting compelling visuals and storytelling.'}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
