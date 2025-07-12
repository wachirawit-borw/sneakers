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
    const [activeSection, setActiveSection] = useState('home');
    const pathname = usePathname();
    const sentinelRef = useRef<HTMLDivElement>(null);

    const mainPageLinks: NavLink[] = [
        { href: "#home", label: "Home" },
        { href: "#products", label: "Products" },
        { href: "#features", label: "Features" },
        { href: "#whychooseus", label: "Why" },
        { href: "#about", label: "About" },
        { href: "#contact", label: "Contact" }
    ];

    const subPageLinks: NavLink[] = [
        { href: "/", label: "Home" },
        { href: "/shop", label: "Shop" },
    ];

    const isHomePage = pathname === '/';
    const isTransparentMode = (isHomePage || allowTransparent) && !isScrolled;
    const navLinksToShow = isHomePage ? mainPageLinks : subPageLinks;

    // Scroll detection using sentinel
    useEffect(() => {
        if (!allowTransparent && !isHomePage) {
            setIsScrolled(true);
            return;
        }

        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsScrolled(!entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0,
            }
        );

        observer.observe(sentinel);
        return () => observer.unobserve(sentinel);
    }, [pathname, allowTransparent, isHomePage]);

    // Active section detection - เพิ่ม debug logs
    useEffect(() => {
        if (!isHomePage) return;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            console.log('Scroll position:', scrollTop);
            
            if (scrollTop < 100) {
                console.log('Setting active section to: home');
                setActiveSection('home');
                return;
            }

            const sections: string[] = ['products', 'features', 'whychooseus', 'about', 'contact'];
            let currentSection = 'home';

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + scrollTop;
                    const elementHeight = rect.height;
                    
                    console.log(`Section ${sectionId}:`, {
                        elementTop,
                        elementHeight,
                        scrollTop,
                        inView: scrollTop >= elementTop - 300
                    });
                    
                    if (scrollTop >= elementTop - 300) {
                        currentSection = sectionId;
                    }
                } else {
                    console.warn(`Section ${sectionId} not found in DOM`);
                }
            }

            console.log('Setting active section to:', currentSection);
            setActiveSection(currentSection);
        };

        // เช็คทันทีว่ามี sections อยู่หรือไม่
        setTimeout(() => {
            console.log('Checking for sections...');
            const sections = ['products', 'features', 'about', 'contact'];
            sections.forEach(id => {
                const element = document.getElementById(id);
                console.log(`Section ${id}:`, element ? 'Found' : 'Not found');
            });
            
            handleScroll();
        }, 500);

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            
            console.log('Clicking link:', targetId);
            
            if (targetId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('home');
                return;
            }
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerHeight = 80;
                const elementPosition = targetElement.offsetTop - headerHeight;
                
                console.log('Scrolling to:', targetId, 'at position:', elementPosition);
                
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
                
                setActiveSection(targetId);
            } else {
                console.error(`Element with id "${targetId}" not found`);
            }
        }
    };

    const isLinkActive = (href: string) => {
        if (href.startsWith('#')) {
            const sectionId = href.substring(1);
            return activeSection === sectionId;
        }
        return pathname === href;
    };

    return (
        <>
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
                        linkClassName={isTransparentMode ? 'text-white' : 'text-gray-100'}
                        onLinkClick={handleLinkClick}
                        activeSection={activeSection}
                        isLinkActive={isLinkActive}
                    />
                </div>
                <div className="md:hidden">
                    <HeaderMobile
                        navLinks={navLinksToShow}
                        isScrolled={!isTransparentMode}
                        onLinkClick={handleLinkClick}
                        activeSection={activeSection}
                        isLinkActive={isLinkActive}
                    />
                </div>
            </header>
        </>
    );
}