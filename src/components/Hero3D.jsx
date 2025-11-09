import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero3D = () => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
          Cinematic Stories, Frame by Frame
        </h1>
        <p className="mt-4 max-w-2xl text-slate-200/90 text-base md:text-lg">
          A modern portfolio for a video editor. Explore curated projects, reels, and client work. Manage your showcase through the admin portal.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <a href="#gallery" className="rounded-full bg-white/10 px-6 py-3 text-white backdrop-blur hover:bg-white/20 transition">View Work</a>
          <a href="#admin" className="rounded-full bg-indigo-500 px-6 py-3 text-white hover:bg-indigo-600 transition">Open Admin</a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
    </section>
  );
};

export default Hero3D;
