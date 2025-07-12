# ✅ เป้าหมายของ Wireframe desktop Layout

- วางโครงสร้างให้เหมาะกับหน้าจอ Desktop (ความกว้าง ≥ 1024px)
- เพิ่มการจัดวางแนวนอน, การใช้ Grid, และช่องว่างที่มากขึ้น
- พร้อมสำหรับแยกเป็น React Components และปรับ Responsive ภายหลัง

---

## 🧩 โครงสร้าง Wireframe: ZURFRK Landing Page

1. **Header / Navigation**
   - ซ้าย:โลโก้ ZURFRK
   - กลาง:เมนู (อาจมีหรือไม่ก็ได้): Home, About, Contact
   - ขวา:CTA ปุ่ม (เช่น “Explore”)
2. **Hero Section**
   - ซ้าย: ข้อความโปรย
     - Headline: "Step into Bold. Walk with ZURFRK."
     - Subtext: สโลแกน/คอนเซปต์
     - ปุ่ม CTA: Shop Now / Explore
   - ขวา: ภาพใหญ่ของรองเท้าหลัก
     - ใช้ grid-cols-2 หรือ flex-row
3. **Features Section**
   - กล่อง 3 ใบ
     - 🪶 เบาแต่ทน
     - ⚡ ส่งด่วน
     - 🧍 ดีไซน์เรียบหรู
   - ใช้ icon + title + short text 4.
4. **Product Preview Section**
   - ใช้ Grid แสดงสินค้าตัวอย่าง 2–3 คู่
     - ภาพ + ชื่อรุ่น + ราคา
     - จัดเรียงเป็น 2 หรือ 3 คอลัมน์ (grid-cols-3)
5. **About Section**
   - ซ้าย: ข้อความเล่าแบรนด์
   - ขวา: ภาพประกอบ (founders หรือรองเท้า)
   - Layout แบบ 2 คอลัมน์ (grid-cols-2)
6. **Newsletter / Contact Section**
   - ฟอร์มกรอก Email: Join the movement
   - ปุ่ม Subscribe
   - หรือปุ่มไปที่ LINE / Contact us
7. **Footer**
   - ซ้าย: โลโก้ + คำโปรยเล็ก
   - กลาง: เมนูซ้ำ (About, Contact)
   - ขวา: Social media icons (Instagram, Facebook, etc.)

---

## ✍️ ตัวอย่างกล่อง Wireframe

```CSS

------------------------------------------------------------
| ZURFRK      | Home | About | Contact | [ Explore ]     | ← Header (แนวนอน)
------------------------------------------------------------

------------------------------------------------------------
| "Step into Bold.     |     [ Hero Image ]                |
|  Walk with ZURFRK."  |                                   |
| [ CTA Button ]       |                                   | ← Hero (2-cols)
------------------------------------------------------------

------------------------------------------------------------
| [🪶 Feature 1]   [⚡ Feature 2]   [🧍 Feature 3]         | ← Features (3-cols)
------------------------------------------------------------

------------------------------------------------------------
| [ Product 1 ]   [ Product 2 ]   [ Product 3 ]            | ← Product Grid (3-cols)
------------------------------------------------------------

------------------------------------------------------------
| [ About Text ]           |      [ Image / Founders ]     | ← About (2-cols)
------------------------------------------------------------

------------------------------------------------------------
| [ Email Input ]       [ Subscribe Button ]               | ← Contact Form (inline)
------------------------------------------------------------

------------------------------------------------------------
| Logo & Desc | Menu: About, Contact | Social Media Icons | ← Footer (3-cols)
------------------------------------------------------------


```

---

## 📌 สรุป

- เวอร์ชัน Desktop นี้ยังคงทุกเนื้อหาจากโครงเดิม แต่ปรับ layout เป็นแนวนอนและใช้ Grid
- แต่ละ Section พร้อมแยกเป็น React Component
- ใช้ Tailwind breakpoint เช่น lg:grid-cols-2, lg:flex-row เพื่อรองรับ Desktop
