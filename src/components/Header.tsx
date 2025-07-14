"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { type NavLink } from './Navigation';
import { Search, ShoppingBag, User, Heart, Menu, Phone, Mail } from 'lucide-react';

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

    // Render different header styles based on page type
    const renderSubPageHeader = () => (
        <header className="sticky top-0 z-50 bg-white shadow-lg">
            {/* Top Bar with gradient theme */}
            <div className="bg-gradient-to-r from-[#f0cca8] to-[#ccdef5] text-gray-800 py-2.5 px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-1">
                        <span className="text-lg">🚚</span>
                        <span className="font-medium">ฟรีค่าส่ง สำหรับคำสั่งซื้อเกิน ฿500</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span className="font-medium">02-123-4567</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span className="font-medium">support@zurfrk.com</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white px-4 py-4 border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#f0cca8] to-[#ccdef5] rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <span className="text-gray-800 font-bold text-xl">Z</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#d17314] to-[#1365cf] bg-clip-text text-transparent">
                                ZURFRK
                            </h1>
                            <p className="text-xs text-gray-500 font-medium">Premium Footwear</p>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="ค้นหาสินค้า, แบรนด์, หรือหมวดหมู่..."
                                className="w-full px-4 py-3.5 pl-12 pr-24 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#f0cca8] to-[#ccdef5] text-gray-800 px-4 py-2 rounded-full hover:shadow-md transition-all font-medium">
                                ค้นหา
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                        <button className="md:hidden p-2.5 hover:bg-gray-100 rounded-full transition-colors">
                            <Search className="w-5 h-5 text-gray-600" />
                        </button>
                        
                        <button className="hidden md:flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Heart className="w-5 h-5 text-gray-600" />
                            <span className="text-sm text-gray-700 font-medium">รายการโปรด</span>
                        </button>
                        
                        <button className="hidden md:flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-full transition-colors">
                            <User className="w-5 h-5 text-gray-600" />
                            <span className="text-sm text-gray-700 font-medium">เข้าสู่ระบบ</span>
                        </button>
                        
                        <button className="relative p-2.5 hover:bg-gray-100 rounded-full transition-colors">
                            <ShoppingBag className="w-5 h-5 text-gray-600" />
                            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-sm">
                                3
                            </span>
                        </button>
                        
                        <button className="md:hidden p-2.5 hover:bg-gray-100 rounded-full transition-colors">
                            <Menu className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-gradient-to-r from-[#f0cca8]/20 to-[#ccdef5]/20 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Categories Dropdown */}
                        <div className="relative">
                            <button className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-[#f0cca8] to-[#ccdef5] text-gray-800 rounded-b-xl hover:shadow-md transition-all font-medium">
                                <Menu className="w-4 h-4" />
                                <span>หมวดหมู่สินค้า</span>
                            </button>
                        </div>

                        {/* Main Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinksToShow.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={clsx(
                                        'px-3 py-3 text-sm font-medium transition-all relative',
                                        {
                                            'text-orange-600 border-b-2 border-orange-400': isLinkActive(link.href),
                                            'text-gray-700 hover:text-orange-600': !isLinkActive(link.href)
                                        }
                                    )}
                                    onClick={handleLinkClick}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Special Offers */}
                        <div className="hidden lg:flex items-center space-x-3">
                            <span className="px-3 py-1.5 bg-gradient-to-r from-red-100 to-orange-100 text-red-600 text-xs font-bold rounded-full shadow-sm">
                                🔥 Sale up to 70%
                            </span>
                            <span className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 text-xs font-bold rounded-full shadow-sm">
                                ✨ New Arrival
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );

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
                    'w-full px-4 sm:px-6 py-4 flex justify-between items-center top-0 z-50 transition-all duration-300',
                    {
                        'absolute bg-transparent': isTransparentMode,
                        'sticky bg-gradient-to-r from-[#f0cca8] to-[#ccdef5] shadow-lg backdrop-blur-sm': !isTransparentMode,
                    }
                )}
            >
                <Link href="/">
                    <h1 className={clsx(
                        'text-3xl font-extrabold tracking-wide cursor-pointer transition-all',
                        {
                            'text-white drop-shadow-lg': isTransparentMode,
                            'bg-gradient-to-r from-[#d17314] to-[#1365cf] bg-clip-text text-transparent': !isTransparentMode,
                        }
                    )}>
                        ZURFRK
                    </h1>
                </Link>

                <div className="hidden md:block">
                    <HeaderDesktop
                        navLinks={navLinksToShow}
                        linkClassName={isTransparentMode ? 'text-white drop-shadow-md' : 'text-gray-800'}
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

    return isHomePage ? renderHomePageHeader() : renderSubPageHeader();
}