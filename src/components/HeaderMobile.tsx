// src/components/HeaderMobile.tsx

"use client";

import { useState } from "react";
import type { FC, MouseEvent } from "react";
import Navigation, { type NavLink } from './Navigation';

const MenuIcon: FC = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const XIcon: FC = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

type HeaderMobileProps = {
  navLinks: NavLink[];
  isScrolled: boolean;
  onLinkClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  activeSection?: string;
  isLinkActive?: (href: string) => boolean;
};

const HeaderMobile: FC<HeaderMobileProps> = ({ 
  navLinks, 
  isScrolled, 
  onLinkClick, 
  activeSection,
  isLinkActive 
}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        onLinkClick(e);
        setMenuOpen(false);
    };

    return (
        <>
            <button
                aria-label="Toggle mobile navigation menu"
                aria-expanded={menuOpen}
                className={`z-50 transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
            {menuOpen && (
                <div className="absolute top-0 left-0 w-full pt-20 bg-[#e5c4a5] shadow-lg">
                    <Navigation
                        links={navLinks}
                        onLinkClick={handleLinkClick}
                        className="flex flex-col items-center space-y-4 py-4"
                        linkClassName="text-gray-800 text-lg font-medium"
                        activeSection={activeSection}
                        isLinkActive={isLinkActive}
                    />
                </div>
            )}
        </>
    );
};

export default HeaderMobile;