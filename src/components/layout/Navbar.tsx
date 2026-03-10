'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  const scrollToCta = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar" id="navbar">
      <Link href="/" className="logo-wrap" style={{ textDecoration: 'none' }}>
        <Image
          src="/images/logo/logo-symbol-dark.png"
          alt="Digixr"
          className="logo-icon"
          width={40}
          height={40}
        />
        <div>
          <div className="logo-text">DIGIXR</div>
          <div className="logo-sub">TECHNOLOGIES</div>
        </div>
      </Link>
      <ul className="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#clients">Clients</a></li>
        <li><a href="#blueprints">Blueprints</a></li>
        <li><a href="#insights">Insights</a></li>
        <li><a href="#purpose">Purpose</a></li>
        <li>
          <a
            href="#cta"
            className="nav-cta"
            onClick={(e) => {
              e.preventDefault();
              scrollToCta();
            }}
          >
            Challenge Us
          </a>
        </li>
      </ul>
    </nav>
  );
}
