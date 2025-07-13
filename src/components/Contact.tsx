'use client';
import Image from "next/image";
import { useState } from "react";

export default function Contact() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        setIsSubscribed(true);
        setTimeout(() => setIsSubscribed(false), 3000);
        setEmail('');
    };

    return (
        <section
            id="contact"
            className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
        >
            {/* Background Image */}
            <Image
                src="/picture/subscribe.webp"
                alt="Subscribe background"
                fill
                className="object-cover z-0"
            />
            
            {/* Animated Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0cca8]/90 via-[#ccdef5]/70 to-[#f0cca8]/90 z-10" />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden z-15">
                <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-48 h-48 bg-blue-200/30 rounded-full blur-3xl animate-pulse top-3/4 right-1/4 translate-x-1/2 translate-y-1/2 animation-delay-2s"></div>
                <div className="absolute w-32 h-32 bg-amber-200/25 rounded-full blur-3xl animate-pulse top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 animation-delay-4s"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-2xl">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        Stay Connected
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-800 leading-relaxed">
                        Join thousands of shoe enthusiasts and get exclusive updates, 
                        early access to new collections, and special offers.
                    </p>
                </div>

                {/* Newsletter Card */}
                <div className="w-full max-w-md">
                    <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full px-6 py-4 bg-white/70 border border-white/60 rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                    required
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 to-blue-200/30 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={isSubscribed}
                                className="w-full relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                                <span className="relative z-10 flex items-center justify-center space-x-2">
                                    {isSubscribed ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Subscribed!</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Subscribe Now</span>
                                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* Social Proof */}
                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <div className="flex items-center justify-center space-x-4 text-slate-600 text-sm">
                                <div className="flex items-center space-x-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span>5.0</span>
                                </div>
                                <span>•</span>
                                <span>25,000+ subscribers</span>
                                <span>•</span>
                                <span>No spam, ever</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-slate-800 font-semibold mb-1">Early Access</h3>
                        <p className="text-slate-600 text-sm">Be the first to know about new releases</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <h3 className="text-slate-800 font-semibold mb-1">Exclusive Offers</h3>
                        <p className="text-slate-600 text-sm">Special discounts for subscribers only</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-slate-800 font-semibold mb-1">Style Tips</h3>
                        <p className="text-slate-600 text-sm">Expert styling advice and trends</p>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animation delays */}
            <style jsx>{`
                .animation-delay-2s {
                    animation-delay: 2s;
                }
                .animation-delay-4s {
                    animation-delay: 4s;
                }
            `}</style>
        </section>
    );
}