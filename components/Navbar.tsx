// components/Navbar.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar-final">
      {/* Left: Home + Guide Icons */}
      <div className="navbar-icons-left">
        <Link href="/" className="navbar-icon-btn" title="Home">
          <img
            src="/logos/YoFi TV Icon.svg"
            alt="Home"
          />
        </Link>
        <Link href="/guide" className="navbar-icon-btn" title="Guide">
          <img
            src="/logos/TV_Guide_Icon.svg"
            alt="Guide"
          />
        </Link>
      </div>

      {/* Right: Hamburger Menu */}
      <button
        className="hamburger-button-final"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="mobile-menu-final">
          <Link
            href="/"
            className="menu-link-final"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/guide"
            className="menu-link-final"
            onClick={() => setMenuOpen(false)}
          >
            Station Guide
          </Link>
          <Link
            href="/about"
            className="menu-link-final"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <hr className="menu-divider-final" />
          <button
            className="menu-cta-final"
            onClick={() => setMenuOpen(false)}
          >
            Host a Station
          </button>
        </div>
      )}
    </nav>
  );
}