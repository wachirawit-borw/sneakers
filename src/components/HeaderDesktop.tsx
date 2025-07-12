// src/components/HeaderDesktop.tsx

"use client";

import type { FC, MouseEvent } from "react";
import Navigation, { type NavLink } from './Navigation';

type HeaderDesktopProps = {
  navLinks: NavLink[];
  linkClassName: string;
  onLinkClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  activeSection?: string;
  isLinkActive?: (href: string) => boolean;
};

const HeaderDesktop: FC<HeaderDesktopProps> = ({ 
  navLinks, 
  linkClassName, 
  onLinkClick, 
  activeSection,
  isLinkActive 
}) => {
  return (
    <Navigation
      links={navLinks}
      className="flex items-center gap-6 font-bold drop-shadow-sm tracking-wide"
      linkClassName={linkClassName}
      onLinkClick={onLinkClick}
      activeSection={activeSection}
      isLinkActive={isLinkActive}
    />
  );
};

export default HeaderDesktop;