import React from 'react';
import Hero3D from './components/Hero3D';
import ProfileHeader from './components/ProfileHeader';
import Gallery from './components/Gallery';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-10">
        <header className="flex items-center justify-between">
          <ProfileHeader />
          <nav className="hidden md:flex items-center gap-4">
            <a href="#gallery" className="text-slate-300 hover:text-white">Work</a>
            <a href="#admin" className="text-slate-300 hover:text-white">Admin</a>
          </nav>
        </header>

        <Hero3D />

        <Gallery />

        <AdminPanel />

        <footer className="py-10 text-center text-slate-400 text-sm">© {new Date().getFullYear()} Video Editor Portfolio</footer>
      </div>
    </div>
  );
}

export default App;
