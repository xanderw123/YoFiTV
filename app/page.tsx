// app/page.tsx

'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="homepage">
      <div className="hero">
        {/* YoFi TV Logo */}
        <div className="hero-logo-container">
          <img
            src="/logos/YoFi TV - Always On.svg"
            alt="YoFi TV Always On"
            className="hero-logo"
          />
        </div>

        {/* Tagline */}
        <p className="hero-tagline">Always On.</p>

        {/* CTA Buttons */}
        <div className="hero-buttons">
          <Link href="/guide" className="hero-button primary">
            YoFi TV Guide
          </Link>
          <Link href="/about" className="hero-button secondary">
            About YoFi TV
          </Link>
        </div>
      </div>
    </main>
  );
}