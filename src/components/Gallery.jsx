import React, { useEffect, useState } from 'react';

const isYouTube = (url) => /youtu\.be|youtube\.com/.test(url);
const isVimeo = (url) => /vimeo\.com/.test(url);

const VideoCard = ({ item }) => {
  const { title, url, description } = item;

  const renderPlayer = () => {
    if (isYouTube(url)) {
      const idMatch = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
      const id = idMatch ? idMatch[1] : '';
      return (
        <iframe
          className="w-full aspect-video rounded-lg"
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (isVimeo(url)) {
      const idMatch = url.match(/vimeo\.com\/(\d+)/);
      const id = idMatch ? idMatch[1] : '';
      return (
        <iframe
          className="w-full aspect-video rounded-lg"
          src={`https://player.vimeo.com/video/${id}`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }

    // Fallback: Google Drive preview links
    // Expecting links like: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // Convert to preview URL
    let previewUrl = url;
    const fileIdMatch = url.match(/\/d\/([\w-]+)/);
    if (fileIdMatch) {
      previewUrl = `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }

    return (
      <iframe
        className="w-full aspect-video rounded-lg"
        src={previewUrl}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    );
  };

  return (
    <div className="group rounded-2xl bg-white/5 p-4 border border-white/10 hover:border-white/20 transition">
      <div className="mb-3">{renderPlayer()}</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-slate-300">{description}</p>
      )}
    </div>
  );
};

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`${base}/videos`);
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        setItems(data);
      } catch (e) {
        setError('Could not load videos yet. Add some in the admin panel.');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <div className="text-slate-300">Loading videos…</div>;
  if (error) return <div className="text-rose-300">{error}</div>;

  return (
    <section id="gallery" className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Featured Work</h2>
      {items.length === 0 ? (
        <p className="text-slate-300">No videos yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <VideoCard key={item._id || item.url} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Gallery;
