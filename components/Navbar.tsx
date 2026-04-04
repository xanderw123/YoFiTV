// components/Navbar.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Left: Logo/Home */}
      <Link href="/" className="navbar-logo">
        <img
          src="/logos/YoFi TV Icon.svg"
          alt="Home"
          className="navbar-logo-img"
        />
      </Link>

      {/* Center: Guide Icon */}
      <Link href="/guide" className="navbar-icon-link">
        <img
          src="/logos/TV_Guide_Icon.svg"
          alt="Guide"
          className="navbar-icon"
        />
      </Link>

      {/* Right: Hamburger Button */}
      <button
        className="hamburger-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link
            href="/"
            className="menu-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/guide"
            className="menu-link"
            onClick={() => setMenuOpen(false)}
          >
            Station Guide
          </Link>
          <Link
            href="/about"
            className="menu-link"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <hr className="menu-divider" />
          <button
            className="menu-cta"
            onClick={() => setMenuOpen(false)}
          >
            Host a Station
          </button>
        </div>
      )}
    </nav>
  );
}