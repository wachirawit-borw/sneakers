'use client';
import Image from 'next/image';

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default function WhyChooseUs() {

    const features = [
        {
            title: "ดีไซน์ที่เหนือกาลเวลา",
            description: "ผสมผสานความคลาสสิกและความโมเดิร์นได้อย่างลงตัว เหมาะกับทุกโอกาสและสไตล์",
            icon: "🎨",
            gradient: "from-amber-400 to-orange-500"
        },
        {
            title: "เทคโนโลยี Z-Comfort™",
            description: "ความสบายที่เหนือกว่าด้วยเทคโนโลยีพื้นรองเป็นเอกสิทธิ์ที่ลดความเมื่อยล้า",
            icon: "⚡",
            gradient: "from-blue-400 to-sky-500"
        },
        {
            title: "รับประกันคุณภาพ",
            description: "มั่นใจในคุณภาพและพร้อมดูแลคุณหลังการขาย ด้วยทีมงานมืออาชีพ",
            icon: "🛡️",
            gradient: "from-emerald-400 to-teal-500"
        }
    ];

    const stats = [
        { number: "50K+", label: "ลูกค้าพึงพอใจ" },
        { number: "98%", label: "ให้คะแนน 5 ดาว" },
        { number: "24/7", label: "บริการลูกค้า" },
        { number: "14 วัน", label: "รับประกันคืนเงิน" }
    ];

    return (
        <section id="whychooseus" className="relative min-h-screen flex items-center py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0cca8] to-[#ccdef5]"></div>
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-white/30 rounded-full blur-3xl animate-pulse top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-64 h-64 bg-blue-200/40 rounded-full blur-3xl animate-pulse top-3/4 right-1/4 translate-x-1/2 translate-y-1/2" style={{animationDelay: '2s'}}></div>
                <div className="absolute w-48 h-48 bg-amber-200/30 rounded-full blur-3xl animate-pulse top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2" style={{animationDelay: '4s'}}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Section */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-300/30 to-blue-300/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/picture/whychoose-image.webp"
                                alt="Why Choose ZURFRK"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        
                        {/* Floating Stats */}
                        <div className="absolute -top-6 -right-6 bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl p-4 shadow-xl">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-slate-800">4.9★</div>
                                <div className="text-slate-600 text-sm">Customer Rating</div>
                            </div>
                        </div>
                        
                        <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl p-4 shadow-xl">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-slate-800">6 ปี</div>
                                <div className="text-slate-600 text-sm">ประสบการณ์</div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-blue-600 bg-clip-text text-transparent mb-6">
                                Why People Choose Our Products?
                            </h2>
                            <p className="text-slate-700 text-lg leading-relaxed">
                                เพราะเราเชื่อว่ารองเท้าที่ดีคือการลงทุน เราจึงพิถีพิถันตั้งแต่การเลือกใช้หนังเกรดพรีเมียมที่ระบายอากาศได้ดี ไปจนถึงการตัดเย็บด้วยมือโดยช่างฝีมือผู้ชำนาญ เพื่อให้แน่ใจว่ารองเท้า ZURFRK ทุกคู่ ไม่เพียงแต่จะดูดีในทุกมุมมอง แต่ยังพร้อมที่จะเป็นรากฐานที่มั่นคงและสบายที่สุดให้กับการเดินทางของคุณ
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Feel Free To Express</h3>
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="group relative"
                                >
                                    <div className="bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl p-6 transition-all duration-300 hover:bg-white/70 hover:border-white/60 hover:shadow-xl">
                                        <div className="flex items-start space-x-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                                {feature.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h4>
                                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                            </div>
                                            <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        </div>
                                        
                                        {/* Hover Effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl p-4 hover:bg-white/70 transition-all duration-300">
                                    <div className="text-2xl font-bold text-slate-800 mb-1">{stat.number}</div>
                                    <div className="text-slate-600 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}