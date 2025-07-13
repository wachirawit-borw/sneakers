'use client';
import { useState } from 'react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqData = [
        {
            question: "ฉันจะเลือกไซส์รองเท้า ZURFRK ได้อย่างไร?",
            answer: "รองเท้าของเราผลิตตามไซส์มาตรฐานยุโรป (EU) เราแนะนำให้คุณเลือกไซส์ปกติที่คุณสวมใส่เป็นประจำ หากไม่แน่ใจ สามารถเทียบขนาดเท้าของคุณ (เซนติเมตร) กับ 'ตารางเทียบไซส์' ของเราในหน้ารายละเอียดสินค้าได้เลยครับ",
            icon: "📏"
        },
        {
            question: "วิธีการดูแลรักษารองเท้าหนังควรทำอย่างไร?",
            answer: "เพื่อให้รองเท้าหนังของคุณสวยงามไปอีกนาน ควรใช้ผ้าแห้งนุ่มๆ เช็ดทำความสะอาดฝุ่นหลังใช้งาน หลีกเลี่ยงการโดนน้ำโดยตรง และควรใช้ครีมบำรุงหนัง (Leather Conditioner) ทุกๆ 2-3 เดือนเพื่อรักษาความชุ่มชื้นและความยืดหยุ่นของหนัง",
            icon: "✨"
        },
        {
            question: "ใช้เวลาจัดส่งนานเท่าไหร่?",
            answer: "สำหรับที่อยู่ในกรุงเทพฯ และปริมณฑล จะใช้เวลาจัดส่ง 1-2 วันทำการ สำหรับจังหวัดอื่นๆ จะใช้เวลาประมาณ 2-4 วันทำการครับ เรามีบริการจัดส่งด่วนพิเศษสำหรับลูกค้าที่ต้องการความรวดเร็ว",
            icon: "🚚"
        },
        {
            question: "สามารถเปลี่ยนหรือคืนสินค้าได้หรือไม่?",
            answer: "เรายินดีรับเปลี่ยนหรือคืนสินค้าภายใน 14 วันนับจากวันที่ได้รับสินค้า โดยสินค้าต้องอยู่ในสภาพสมบูรณ์ ยังไม่ผ่านการใช้งาน และบรรจุภัณฑ์อยู่ครบถ้วน กรุณาติดต่อทีมบริการลูกค้าของเราเพื่อดำเนินการขั้นต่อไป",
            icon: "🔄"
        },
        {
            question: "มีการรับประกันสินค้าหรือไม่?",
            answer: "รองเท้า ZURFRK ทุกคู่มีการรับประกันคุณภาพนาน 6 เดือน ครอบคลุมความเสียหายจากการผลิต เช่น การแตกของหนัง หรือการหลุดของพื้นรองเท้า (ไม่รวมความเสียหายจากการใช้งานปกติ)",
            icon: "🛡️"
        },
        {
            question: "ชำระเงินด้วยวิธีไหนได้บ้าง?",
            answer: "เรารับชำระเงินหลายช่องทาง ทั้งบัตรเครดิต/เดบิต, โอนผ่านธนาคาร, พร้อมเพย์, ทรูมันนี่ และมีบริการเก็บเงินปลายทางสำหรับพื้นที่ที่เราให้บริการ",
            icon: "💳"
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="relative min-h-screen flex flex-col justify-center py-20 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0cca8] to-[#ccdef5]"></div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-amber-200/30 rounded-full blur-3xl animate-pulse top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-64 h-64 bg-blue-200/40 rounded-full blur-3xl animate-pulse top-3/4 left-1/4 -translate-x-1/2 translate-y-1/2" style={{ animationDelay: '2s' }}></div>
                <div className="absolute w-48 h-48 bg-orange-200/25 rounded-full blur-3xl animate-pulse top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse top-3/4 right-1/4 translate-x-1/2 translate-y-1/2 animation-delay-2s"></div>
                <div className="absolute w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 animation-delay-4s"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-blue-600 bg-clip-text text-transparent mb-6">
                        คำถามที่พบบ่อย
                    </h2>
                    <p className="text-slate-900">
                        ค้นหาคำตอบสำหรับคำถามที่ลูกค้าสนใจมากที่สุด
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div key={index} className="group">
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/15 hover:border-white/30">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                                            <span className="text-xl">{item.icon}</span>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-semibold text-black/80 group-hover:text-purple-900/80 transition-colors duration-300">
                                            {item.question}
                                        </h3>
                                    </div>
                                    <div className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                        <svg className="w-6 h-6 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                <div className={`transition-all duration-300 overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <div className="px-6 pb-6">
                                        <div className="ml-16 p-4 bg-black/5 rounded-xl border border-white/10">
                                            <p className="text-black/90 leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="mt-12 text-center">
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-slate-800">
                            ยังไม่พบคำตอบที่ต้องการ?
                        </h3>
                        <p className="text-slate-600 py-2">
                            ทีมบริการลูกค้าของเราพร้อมให้ความช่วยเหลือคุณตลอด 24/7
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="#contact" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                                ติดต่อเรา
                            </a>
                            <a href="tel:+66-XXX-XXX-XXX" className="bg-white/10 hover:bg-white/20 text-black font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/30">
                                โทร 02-XXX-XXXX
                            </a>
                        </div>
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