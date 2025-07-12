// src/components/Navigation.tsx

"use client";

import type { FC, MouseEvent } from "react";
import Link from 'next/link';
import clsx from 'clsx';

export type NavLink = {
  href: string;
  label: string;
};

type NavigationProps = {
  links: NavLink[];
  className?: string;
  linkClassName?: string;
  onLinkClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  isLinkActive?: (href: string) => boolean;
  activeSection?: string;
};

const Navigation: FC<NavigationProps> = ({ 
  links, 
  className, 
  linkClassName, 
  onLinkClick, 
  isLinkActive 
}) => {
  return (
    <nav className={className}>
      {links.map((link: NavLink) => {
        const isActive = isLinkActive ? isLinkActive(link.href) : false;
        
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={clsx(
              'hover:opacity-80 transition-all duration-300 relative',
              linkClassName,
              {
                // เพิ่ม style สำหรับ active link
                'opacity-100 font-bold': isActive,
                // เพิ่ม underline สำหรับ active link
                'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-100': isActive,
                // ซ่อน underline สำหรับ inactive link
                'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:transform after:scale-x-0 hover:after:scale-x-100': !isActive,
              }
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;