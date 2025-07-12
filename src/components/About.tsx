import Image from "next/image";

export default function About() {

    return (
        <>
            <section id="about" className="bg-gradient-to-r from-[#f0cca8] to-[#ccdef5] py-20 px-4 text-black">
                <h2 className="text-2xl font-bold text-center mb-15 drop-shadow">About</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-5 px-4 place-self-start">
                        <h3 className="text-lg font-bold">ZURFRK</h3>
                        <p className="text-sm">
                            การเดินทางของเราไม่ได้เริ่มต้นจากแผนธุรกิจ แต่จากความหลงใหลในการตามหารองเท้าคู่ที่สมบูรณ์แบบรองเท้าที่สง่างามพอสำหรับทุกวันทำงาน แต่ก็ยังคงความสบายไว้สำหรับวันพักผ่อน และที่สำคัญคือต้องสะท้อนตัวตนของผู้สวมใส่ได้อย่างแท้จริง
                        </p>
                        <p className="text-sm">
                            เมื่อการตามหาสิ้นสุดลงโดยไม่พบสิ่งที่เราต้องการ เราจึงตัดสินใจสร้างสรรค์มันขึ้นมาด้วยตัวเอง หัวใจสำคัญของ ZURFRK ตั้งอยู่บนหลักการสามข้อที่แน่วแน่ นั่นคือ วัสดุชั้นเลิศ ดีไซน์ที่อยู่เหนือกาลเวลา และความใส่ใจในทุกรายละเอียด เราทำงานร่วมกับช่างฝีมือผู้เปี่ยมประสบการณ์ เพื่อรังสรรค์รองเท้าทุกคู่ให้เป็นดั่งงานศิลปะที่พร้อมไปกับคุณในทุกย่างก้าว
                        </p>
                        <p className="text-sm">
                            เราไม่ได้มอบแค่รองเท้า แต่เรามอบความมั่นใจและรากฐานอันมั่นคง เพื่อให้ทุกการเดินทางในชีวิตของคุณเปี่ยมไปด้วยความสง่างาม</p>
                    </div>
                    <Image
                        src="/picture/about-image.webp"
                        alt="About ZURFRK"
                        width={550}
                        height={400}
                    />
                </div>
            </section>
        </>
    )
}