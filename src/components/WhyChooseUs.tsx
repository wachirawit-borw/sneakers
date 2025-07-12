import Image from 'next/image';

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default function WhyChooseUs() {
    return (
        <section className="bg-gradient-to-r from-[#f0cca8] to-[#ccdef5] py-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="w-full">
                    <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl">
                        <Image
                            src="/picture/whychoose-image.webp"
                            alt="Why Choose ZURFRK"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="text-gray-1000">
                    <h2 className="text-4xl font-bold mb-4">Why People Choose Our Products?</h2>
                    <p className="text-gray-600 mb-10 leading-relaxed">
                        เพราะเราเชื่อว่ารองเท้าที่ดีคือการลงทุน เราจึงพิถีพิถันตั้งแต่การเลือกใช้หนังเกรดพรีเมียมที่ระบายอากาศได้ดี ไปจนถึงการตัดเย็บด้วยมือโดยช่างฝีมือผู้ชำนาญ เพื่อให้แน่ใจว่ารองเท้า ZURFRK ทุกคู่ ไม่เพียงแต่จะดูดีในทุกมุมมอง แต่ยังพร้อมที่จะเป็นรากฐานที่มั่นคงและสบายที่สุดให้กับการเดินทางของคุณ
                    </p>

                    <h3 className="text-2xl font-bold mb-4">Feel Free To Express</h3>
                    <ul className="space-y-4 text-gray-700">
                        <li className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                            <span>ดีไซน์ที่อยู่เหนือกาลเวลาผสมผสานความคลาสสิกและความโมเดิร์นได้อย่างลงตัว</span>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                            <span>ความสบายที่เหนือกว่าด้วยเทคโนโลยีพื้นรอง Z-Comfort™ ที่เป็นเอกสิทธิ์ของเรา</span>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                            <span>รับประกันคุณภาพเรามั่นใจในคุณภาพและพร้อมดูแลคุณหลังการขาย</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}