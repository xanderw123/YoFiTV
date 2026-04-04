// components/Navbar.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Left: Home + Guide Icons */}
      <div className="navbar-icons-left">
        <Link href="/" className="navbar-icon-link" title="Home">
          <img
            src="/logos/YoFi TV Icon.svg"
            alt="Home"
            className="navbar-icon"
          />
        </Link>
        <Link href="/guide" className="navbar-icon-link" title="Guide">
          <img
            src="/logos/TV_Guide_Icon.svg"
            alt="Guide"
            className="navbar-icon"
          />
        </Link>
      </div>

      {/* Right: Hamburger Menu */}
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