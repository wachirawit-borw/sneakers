'use client';
import Image from "next/image";

export default function About() {
    const values = [
        {
            title: "วัสดุชั้นเลิศ",
            description: "หนังเกรดพรีเมียม",
            icon: "💎",
            gradient: "from-amber-400 to-orange-500"
        },
        {
            title: "ดีไซน์เหนือกาลเวลา",
            description: "สไตล์ที่ไม่เคยล้าสมัย",
            icon: "🎨",
            gradient: "from-orange-400 to-red-500"
        },
        {
            title: "ใส่ใจรายละเอียด",
            description: "ทุกขั้นตอนด้วยฝีมือ",
            icon: "✨",
            gradient: "from-blue-400 to-cyan-500"
        }
    ];

    return (
        <section id="about" className="relative min-h-screen flex items-center py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0cca8] to-[#ccdef5]"></div>
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-amber-200/30 rounded-full blur-3xl animate-pulse top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-64 h-64 bg-blue-200/40 rounded-full blur-3xl animate-pulse top-3/4 left-1/4 -translate-x-1/2 translate-y-1/2" style={{animationDelay: '2s'}}></div>
                <div className="absolute w-48 h-48 bg-orange-200/25 rounded-full blur-3xl animate-pulse top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2" style={{animationDelay: '4s'}}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-blue-600 bg-clip-text text-transparent mb-6">
                        About ZURFRK
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-blue-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Content Section */}
                    <div className="space-y-8">
                        {/* Brand Story */}
                        <div className="bg-white/70 backdrop-blur-lg border border-white/50 rounded-3xl p-8 shadow-2xl">
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                        Z
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800">ZURFRK</h3>
                                        <p className="text-slate-600">Journey of Perfection</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-4 text-slate-700 leading-relaxed">
                                    <p>
                                        การเดินทางของเราไม่ได้เริ่มต้นจากแผนธุรกิจ แต่จากความหลงใหลในการตามหารองเท้าคู่ที่สมบูรณ์แบบ รองเท้าที่สง่างามพอสำหรับทุกวันทำงาน แต่ก็ยังคงความสบายไว้สำหรับวันพักผ่อน และที่สำคัญคือต้องสะท้อนตัวตนของผู้สวมใส่ได้อย่างแท้จริง
                                    </p>
                                    <p>
                                        เมื่อการตามหาสิ้นสุดลงโดยไม่พบสิ่งที่เราต้องการ เราจึงตัดสินใจสร้างสรรค์มันขึ้นมาด้วยตัวเอง หัวใจสำคัญของ ZURFRK ตั้งอยู่บนหลักการสามข้อที่แน่วแน่
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Core Values */}
                        <div className="space-y-4">
                            {values.map((value, index) => (
                                <div key={index} className="group bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl p-6 hover:bg-white/70 hover:border-white/60 transition-all duration-300 hover:shadow-xl">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                            {value.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-slate-800 mb-1">{value.title}</h4>
                                            <p className="text-slate-600 text-sm">{value.description}</p>
                                        </div>
                                    </div>
                                    <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                                </div>
                            ))}
                        </div>

                        {/* Mission Statement */}
                        <div className="bg-gradient-to-r from-amber-100/80 to-blue-100/80 backdrop-blur-lg border border-white/50 rounded-3xl p-8 shadow-2xl">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    เราไม่ได้มอบแค่รองเท้า แต่เรามอบความมั่นใจและรากฐานอันมั่นคง เพื่อให้ทุกการเดินทางในชีวิตของคุณเปี่ยมไปด้วยความสง่างาม
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-300/30 to-blue-300/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/picture/about-image.webp"
                                alt="About ZURFRK"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            
                            {/* Overlay Content */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl p-4">
                                    <h4 className="text-slate-800 font-semibold mb-1">Crafted with Passion</h4>
                                    <p className="text-slate-600 text-sm">งานศิลปะที่พร้อมไปกับคุณในทุกย่างก้าว</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full opacity-80"></div>
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-60"></div>
                        <div className="absolute top-1/2 -right-6 w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full opacity-70"></div>
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl p-6 hover:bg-white/70 transition-all duration-300">
                        <div className="text-4xl font-bold text-slate-800 mb-2">2018</div>
                        <div className="text-slate-600">ก่อตั้งบริษัท</div>
                    </div>
                    <div className="text-center bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl p-6 hover:bg-white/70 transition-all duration-300">
                        <div className="text-4xl font-bold text-slate-800 mb-2">50K+</div>
                        <div className="text-slate-600">ลูกค้าที่ไว้วางใจ</div>
                    </div>
                    <div className="text-center bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl p-6 hover:bg-white/70 transition-all duration-300">
                        <div className="text-4xl font-bold text-slate-800 mb-2">100+</div>
                        <div className="text-slate-600">แบบดีไซน์</div>
                    </div>
                </div>
            </div>
        </section>
    );
}