# 🏆 ZURFRK – Portfolio Website

เว็บไซต์ **Portfolio ส่วนตัวของ _Wachirawit Borwonsuk_**  
นำเสนอผลงาน ดีไซน์ และทักษะการพัฒนาผ่าน Landing Page ที่ทันสมัย สวยงาม และใช้งานได้จริง

---

## 🎯 เป้าหมายของโปรเจกต์
- แสดงตัวตนและแบรนด์ **ZURFRK** ด้วยภาพลักษณ์ที่เรียบหรูและทันสมัย  
- ฝึกฝนและประยุกต์ใช้เทคโนโลยี Frontend ที่ได้เรียนรู้มา  
- สร้าง **Landing Page** ที่ responsive, เข้าถึงง่าย และเป็นมิตรกับ SEO  

---

## 🛠️ เทคโนโลยีที่ใช้
| เทคโนโลยี | รายละเอียด |
|------------|-------------|
| **React** | พัฒนา UI แบบ component-based ที่นำกลับมาใช้ซ้ำได้ |
| **TypeScript** | เพิ่มความปลอดภัยของชนิดข้อมูล พร้อมช่วยตรวจ error ตั้งแต่ compile-time |
| **Next.js (App Router)** | จัดการ routing, optimize performance และรองรับการ deploy ระดับ production |
| **Tailwind CSS** | Utility-first CSS framework สำหรับการจัด layout และ style |
| **HTML5 + CSS3** | โครงสร้างหลักและพื้นฐานการออกแบบหน้าเว็บ |
| **Video Background + Fallback** | ใช้วิดีโอเป็นพื้นหลัง และสลับเป็นรูปภาพอัตโนมัติเมื่อไม่รองรับ |
| **Responsive Design** | รองรับการใช้งานทุกขนาดหน้าจอ |
| **Lighthouse Optimization** | เน้น SEO, performance และ accessibility |

---

## 🎬 ฟีเจอร์หลัก
- **พื้นหลังวิดีโอพร้อม fallback**  
  วิดีโอเล่นเป็นพื้นหลังใน Hero section และ fallback เป็นรูปภาพหาก browser ไม่รองรับ  
- **Component แยกชัดเจน**  
  เช่น `ImageBox`, `Feature`, `FooterBlock`, `FooterList` เพื่อความเป็นระบบและ reusability  
- **Navigation รองรับทั้ง desktop และ mobile**  
  มี dropdown menu บน mobile พร้อม toggle ผ่าน `useState`  
- **SEO-Friendly**  
  ใช้ semantic HTML (`<section>`, `<header>`, `<footer>`) และใส่ `alt` ใน `<Image>` อย่างถูกต้อง  

---

## 📱 Responsive ครอบคลุม
- Mobile (≤ 640px)  
- Tablet (≥ 768px)  
- Desktop (≥ 1024px)  
- ใช้ Tailwind breakpoint เช่น `sm:`, `md:`, `lg:`  

---

## 📌 หมายเหตุ
- วิดีโอ `.webm` preload ด้วย `<video preload="auto" />`  
- ใช้ `useEffect` ตรวจสอบ browser ว่าสามารถเล่น video ได้หรือไม่ ถ้าไม่ได้ → แสดงรูป fallback  

---

## 👨‍🎓 ผู้พัฒนา
**ZURFRK**  
Fullstack Frontend Developer  
พัฒนาโปรเจกต์นี้เพื่อฝึก **React + Next.js + Tailwind CSS** ในระดับ production
