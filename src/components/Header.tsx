"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { type NavLink } from './Navigation';

interface HeaderProps {
  allowTransparent?: boolean;
}

export default function Header({ allowTransparent = false }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const sentinelRef = useRef<HTMLDivElement>(null);

    const mainPageLinks: NavLink[] = [
        { href: "/", label: "Home" },
        { href: "/shop", label: "Shop" },
        { href: "#features", label: "Features" },
        { href: "#about", label: "About" },
        { href: "#explore", label: "Explore" },
    ];

    const subPageLinks: NavLink[] = [
        { href: "/", label: "Home" },
        { href: "/shop", label: "Shop" },
    ];

    const isHomePage = pathname === '/';
    const isTransparentMode = (isHomePage || allowTransparent) && !isScrolled;
    const navLinksToShow = isHomePage ? mainPageLinks : subPageLinks;

    useEffect(() => {
        // ถ้าไม่ได้อยู่ในโหมดโปร่งใส ให้ตั้งค่า isScrolled เป็น true ทันที
        if (!allowTransparent && !isHomePage) {
            setIsScrolled(true);
            return;
        }

        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // เมื่อ sentinel ออกจากหน้าจอ (ไม่ intersecting) แสดงว่าเราได้ scroll ลงมาแล้ว
                setIsScrolled(!entry.isIntersecting);
            },
            {
                root: null, // ใช้ viewport เป็น root
                rootMargin: '0px',
                threshold: 0, // trigger เมื่อ sentinel เริ่มหายไปจากหน้าจอ
            }
        );

        observer.observe(sentinel);

        return () => {
            observer.unobserve(sentinel);
        };
    }, [pathname, allowTransparent, isHomePage]);

    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            if (targetId === 'header') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            {/* Sentinel element - วางไว้ที่ตำแหน่งที่ต้องการให้ trigger */}
            <div 
                ref={sentinelRef} 
                className="absolute top-0 left-0 w-full h-16 pointer-events-none"
                style={{ zIndex: -1 }}
            />
            
            <header
                id="header"
                className={clsx(
                    'w-full px-4 sm:px-6 py-4 flex justify-between items-center top-0 z-50 transition-all duration-300',
                    {
                        'absolute bg-transparent': isTransparentMode,
                        'sticky bg-gradient-to-r from-[#d17314] to-[#1365cf] shadow-md': !isTransparentMode,
                    }
                )}
            >
                <Link href="/">
                    <h1 className={clsx(
                        'text-3xl font-extrabold tracking-wide cursor-pointer',
                        {
                            'text-white': isTransparentMode,
                            'text-gray-100': !isTransparentMode,
                        }
                    )}>
                        ZURFRK
                    </h1>
                </Link>

                <div className="hidden md:block">
                    <HeaderDesktop
                        navLinks={navLinksToShow}
                        linkClassName={isTransparentMode ? 'text-white' : 'text-gray-700'}
                        onLinkClick={handleLinkClick}
                    />
                </div>
                <div className="md:hidden">
                    <HeaderMobile
                        navLinks={navLinksToShow}
                        isScrolled={!isTransparentMode}
                        onLinkClick={handleLinkClick}
                    />
                </div>
            </header>
        </>
    );
}