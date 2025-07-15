"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { type NavLink } from './Navigation';
import { ShoppingBag, User, Heart, Menu, Search, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  allowTransparent?: boolean;
}

export default function Header({ allowTransparent = false }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [cartCount] = useState(3);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
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
        { href: "/", label: "หน้าแรก" },
        { href: "/shop", label: "สินค้าทั้งหมด" },
        { href: "/categories", label: "หมวดหมู่" },
        { href: "/brands", label: "แบรนด์" },
        { href: "/sale", label: "ลดราคา" },
        { href: "/new-arrivals", label: "สินค้าใหม่" }
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

    // Active section detection
    useEffect(() => {
        if (!isHomePage) return;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop < 100) {
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
                    
                    if (scrollTop >= elementTop - 300) {
                        currentSection = sectionId;
                    }
                }
            }

            setActiveSection(currentSection);
        };

        setTimeout(() => {
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
            
            if (targetId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('home');
                return;
            }
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerHeight = 80;
                const elementPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
                
                setActiveSection(targetId);
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

    // Enhanced sub-page header with theme colors
    const renderSubPageHeader = () => (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex items-center justify-between py-3">
                    {/* Enhanced Logo with theme colors */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#f0cca8] to-[#ccdef5] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                <span className="text-gray-800 font-bold text-xl">Z</span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#d4a574] to-[#98b6e8] bg-clip-text text-transparent">
                                ZURFRK
                            </h1>
                            <p className="text-xs text-gray-600 font-medium">Premium Footwear</p>
                        </div>
                    </Link>

                    {/* Enhanced Navigation with theme colors */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinksToShow.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    'relative px-4 py-2 text-sm font-medium transition-all duration-300 group',
                                    {
                                        'text-transparent bg-gradient-to-r from-[#d4a574] to-[#98b6e8] bg-clip-text': isLinkActive(link.href),
                                        'text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-[#d4a574] hover:to-[#98b6e8] hover:bg-clip-text': !isLinkActive(link.href)
                                    }
                                )}
                                onClick={handleLinkClick}
                            >
                                {link.label}
                                <span className={clsx(
                                    'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#f0cca8] to-[#ccdef5] transition-all duration-300',
                                    {
                                        'w-full': isLinkActive(link.href),
                                        'w-0 group-hover:w-full': !isLinkActive(link.href)
                                    }
                                )}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Enhanced Action Area with theme colors */}
                    <div className="flex items-center space-x-4">
                        {/* Search Button */}
                        <button 
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="hidden md:flex items-center justify-center w-10 h-10 hover:bg-gradient-to-r hover:from-[#f0cca8]/20 hover:to-[#ccdef5]/20 rounded-full transition-all duration-300 hover:scale-105"
                        >
                            <Search className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Notification */}
                        <button className="hidden md:flex items-center justify-center w-10 h-10 hover:bg-gradient-to-r hover:from-[#f0cca8]/20 hover:to-[#ccdef5]/20 rounded-full transition-all duration-300 hover:scale-105 relative">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#e8a567] to-[#8ba3d1] rounded-full animate-bounce"></span>
                        </button>

                        {/* Wishlist */}
                        <button className="hidden md:flex items-center space-x-2 px-3 py-2 hover:bg-gradient-to-r hover:from-[#f0cca8]/20 hover:to-[#ccdef5]/20 rounded-full transition-all duration-300 hover:scale-105">
                            <Heart className="w-5 h-5 text-gray-600" />
                            <span className="text-sm text-gray-700 font-medium">รายการโปรด</span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="hidden md:flex relative">
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-2 px-3 py-2 hover:bg-gradient-to-r hover:from-[#f0cca8]/20 hover:to-[#ccdef5]/20 rounded-full transition-all duration-300 hover:scale-105"
                            >
                                <User className="w-5 h-5 text-gray-600" />
                                <span className="text-sm text-gray-700 font-medium">บัญชี</span>
                                <ChevronDown className={clsx("w-4 h-4 text-gray-500 transition-transform", {
                                    "rotate-180": isProfileOpen
                                })} />
                            </button>
                            
                            {isProfileOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[#f0cca8]/20 hover:to-[#ccdef5]/20 transition-all duration-200">
                                        เข้าสู่ระบบ
                                    </Link>
                                    <Link href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[#f0cca8]/20 hover:to-[#ccdef5]/20 transition-all duration-200">
                                        สมัครสมาชิก
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Shopping Cart */}
                        <Link href="/cart" className="relative p-3 hover:bg-gradient-to-r hover:from-[#f0cca8]/20 hover:to-[#ccdef5]/20 rounded-full transition-all duration-300 hover:scale-105 group">
                            <ShoppingBag className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#e8a567] to-[#8ba3d1] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu */}
                        <button className="lg:hidden p-2 hover:bg-gradient-to-r hover:from-[#f0cca8]/20 hover:to-[#ccdef5]/20 rounded-full transition-all duration-300">
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Search Bar with theme colors */}
                {isSearchOpen && (
                    <div className="pb-4 border-t border-gray-200 pt-4 mt-2">
                        <div className="relative max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="ค้นหาสินค้า..."
                                className="w-full px-4 py-3 pl-12 bg-gradient-to-r from-[#f0cca8]/10 to-[#ccdef5]/10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:border-transparent transition-all duration-300"
                                autoFocus
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );

    // Enhanced home page header with theme colors
    const renderHomePageHeader = () => (
        <>
            <div 
                ref={sentinelRef} 
                className="absolute top-0 left-0 w-full h-16 pointer-events-none"
                style={{ zIndex: -1 }}
            />
            
            <header
                id="header"
                className={clsx(
                    'w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center top-0 z-50 transition-all duration-500',
                    {
                        'absolute bg-transparent': isTransparentMode,
                        'sticky bg-gradient-to-r from-[#d88e5a] to-[#6fa0db] backdrop-blur-lg shadow-lg border-b border-gray-200/50': !isTransparentMode,
                    }
                )}
            >
                <Link href="/" className="group">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className={clsx(
                                'w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105',
                                {
                                    'bg-white/20 backdrop-blur-sm': isTransparentMode,
                                    'bg-gradient-to-br from-[#f0cca8] to-[#ccdef5]': !isTransparentMode
                                }
                            )}>
                                <span className={clsx(
                                    'font-bold text-xl transition-colors',
                                    {
                                        'text-white': isTransparentMode,
                                        'text-gray-800': !isTransparentMode
                                    }
                                )}>Z</span>
                            </div>
                        </div>
                        <h1 className={clsx(
                            'text-2xl font-extrabold tracking-wide transition-all duration-300',
                            {
                                'text-white drop-shadow-lg': isTransparentMode,
                                'text-neutral-900 bg-clip-text text-transparent': !isTransparentMode,
                            }
                        )}>
                            ZURFRK
                        </h1>
                    </div>
                </Link>

                <div className="hidden md:block">
                    <HeaderDesktop
                        navLinks={navLinksToShow}
                        linkClassName={clsx(
                            'transition-all duration-300',
                            {
                                'text-white drop-shadow-md hover:text-[#f0cca8]': isTransparentMode,
                                'text-gray-800 hover:text-transparent hover:bg-gradient-to-r hover:from-[#d4a574] hover:to-[#98b6e8] hover:bg-clip-text': !isTransparentMode
                            }
                        )}
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

    // Click outside handler for dropdowns
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            const target = event.target as HTMLElement;
            
            // Check if click is outside profile dropdown
            if (isProfileOpen && !target.closest('[data-profile-dropdown]')) {
                setIsProfileOpen(false);
            }
            
            // Check if click is outside search
            if (isSearchOpen && !target.closest('[data-search-area]')) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileOpen, isSearchOpen]);

    return isHomePage ? renderHomePageHeader() : renderSubPageHeader();
}