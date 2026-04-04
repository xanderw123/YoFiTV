// components/Navbar.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo/Home */}
      <Link href="/" className="navbar-logo">
        <img
          src="/logos/YoFi TV Icon.svg"
          alt="YoFi TV"
          className="navbar-logo-img"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="navbar-desktop">
        <Link href="/guide" className="navbar-link">
          <img src="/logos/TV_Guide_Icon.svg" alt="Guide" />
          <span>Guide</span>
        </Link>
      </div>

      {/* Hamburger Button */}
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