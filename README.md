# 🥤 Vending Machine Frontend (ตู้ขายสินค้าอัตโนมัติ)

> โปรเจค Frontend สำหรับระบบตู้ขายสินค้าอัตโนมัติ สร้างด้วย React, TypeScript และ Tailwind CSS

## 📖 สารบัญ | Table of Contents

- [Features (ฟีเจอร์)](#-features-ฟีเจอร์)
- [Tech Stack (เทคโนโลยี)](#️-tech-stack-เทคโนโลยี)
- [Prerequisites (สิ่งที่ต้องมี)](#-prerequisites-สิ่งที่ต้องมี)
- [Installation (การติดตั้ง)](#️-installation-การติดตั้ง)
- [Running (วิธีรัน)](#-running-วิธีรัน)
- [Project Structure (โครงสร้างโปรเจค)](#-project-structure-โครงสร้างโปรเจค)
- [How to Use (วิธีใช้งาน)](#-how-to-use-วิธีใช้งาน)
- [API Endpoints](#-api-endpoints)
- [Troubleshooting (แก้ปัญหา)](#-troubleshooting-แก้ปัญหา)

---

## 🚀 Features (ฟีเจอร์)

| Feature | Description |
|---------|-------------|
| 🛒 **Product Selection** | เลือกสินค้าพร้อมแสดง stock แบบ real-time |
| 💰 **Cash Deposit** | ใส่เงินหลายค่าธนบัตร (฿1-฿1000) |
| 🔄 **Order Management** | จัดการออเดอร์ (สร้าง, เลือก, ซื้อ, ยกเลิก) |
| 💵 **Change Calculation** | คำนวณเงินทอนอัตโนมัติพร้อมแสดงรายละเอียด |
| 📦 **Stock Control** | ตรวจจับสินค้าหมด + ปิดการใช้งานอัตโนมัติ |
| 🎨 **Responsive Design** | รองรับทุกขนาดหน้าจอ |

---

## 🛠️ Tech Stack (เทคโนโลยี)

```
Frontend:
├── React 19.2.0          → UI Library
├── TypeScript ~5.9.3     → Type Safety
├── Vite 7.3.1            → Build Tool & Dev Server
├── Tailwind CSS v4       → Styling Framework
├── Axios                 → HTTP Client
└── React Router DOM 7    → Routing

Backend (ต้องรันแยก):
└── NestJS on localhost:9000
```

---

## 📋 Prerequisites (สิ่งที่ต้องมี)

ก่อนเริ่มต้น ต้องติดตั้งสิ่งเหล่านี้ก่อน:

- ✅ **Node.js** v18 หรือสูงกว่า ([Download](https://nodejs.org/))
- ✅ **npm** หรือ **yarn** (มาพร้อม Node.js)
- ✅ **Backend API** ที่รันอยู่ที่ `http://localhost:9000`

ตรวจสอบ version:
```bash
node -v   # ควรเป็น v18 ขึ้นไป
npm -v    # ควรเป็น v9 ขึ้นไป
```

---

## ⚙️ Installation (การติดตั้ง)

### 1️⃣ Clone โปรเจค
```bash
git clone https://github.com/supawitsnnrk/bluepi-testing-frontend.git
cd bluepi-testing-frontend
```

### 2️⃣ ติดตั้ง Dependencies
```bash
npm install
```

### 3️⃣ สร้างไฟล์ `.env`
สร้างไฟล์ `.env` ที่ root directory:
```env
VITE_API_BASE_URL=http://localhost:9000/api
```

> **💡 หมายเหตุ:** ถ้า Backend รันที่ port อื่น ให้แก้ URL ให้ตรงกัน

---

## 🏃 Running (วิธีรัน)

### Development Mode (โหมดพัฒนา)
```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่: **http://localhost:5173**

### Production Build (สร้างไฟล์ production)
```bash
npm run build
npm run preview
```

### คำสั่งอื่นๆ
```bash
npm run lint      # ตรวจสอบโค้ดด้วย ESLint
npm run format    # Format โค้ด (ถ้ามี Prettier)
```

---

## 📁 Project Structure (โครงสร้างโปรเจค)

```
bluepi-testing-frontend/
├── src/
│   ├── pages/
│   │   └── VendingPage/           # 🥤 หน้าหลักตู้ขายของ
│   │       ├── VendingPage.tsx    # Component หลัก
│   │       └── components/        # Components ย่อย
│   │           ├── ProductCard.tsx    # Card สินค้า
│   │           └── PaymentPanel.tsx   # Panel ชำระเงิน
│   │
│   ├── services/                  # 🔌 API Services
│   │   ├── axios-instance.ts      # Config Axios
│   │   └── vending-service.ts     # API Methods
│   │
│   ├── shared/                    # 🔄 Shared Resources
│   │   ├── components/            # Components กลาง
│   │   │   └── Modal.tsx          # Modal สำหรับแจ้งเตือน
│   │   ├── hooks/                 # Custom Hooks
│   │   │   └── useModal.ts        # Hook จัดการ Modal
│   │   ├── types/                 # TypeScript Types
│   │   │   ├── products.ts
│   │   │   ├── order.ts
│   │   │   └── denominations.ts
│   │   ├── config/                # Configuration Files
│   │   │   └── vending-config.ts  # API Endpoints
│   │   └── utils/                 # Utility Functions
│   │
│   └── assets/                    # 🎨 Static Files
│
├── .env                           # Environment Variables
├── vite.config.ts                 # Vite Configuration
└── tailwind.config.js             # Tailwind Configuration
```

---

## 🎯 How to Use (วิธีใช้งาน)

### ขั้นตอนการซื้อสินค้า:

```
1. เลือกสินค้า 🛒
   └─→ คลิกที่ card สินค้าที่ต้องการ

2. ใส่เงิน 💰
   └─→ คลิกปุ่มธนบัตร (฿1, ฿5, ฿10, ฿20, ฿50, ฿100, ฿500, ฿1000)

3. ซื้อสินค้า 🎁
   └─→ คลิก "Purchase" เมื่อเงินพอ

4. รับเงินทอน 💵
   └─→ ระบบจะแสดงเงินทอนพร้อมรายละเอียดธนบัตร
```

### ฟังก์ชันเพิ่มเติม:

- **Clear** - ล้างสินค้าที่เลือก (ข้างล่าง product grid)
- **Cancel** - ยกเลิกทั้งออเดอร์ + คืนเงิน

---

## 🌐 API Endpoints

Backend ต้องมี endpoints เหล่านี้:

| Method | Endpoint | Description (ภาษาไทย) |
|--------|----------|----------------------|
| `GET` | `/products` | ดึงรายการสินค้าทั้งหมดพร้อม stock |
| `GET` | `/denominations` | ดึงรายการธนบัตรที่ใช้ได้ |
| `POST` | `/orders` | สร้างออเดอร์ใหม่ |
| `POST` | `/orders/:orderId/select-product` | เลือกสินค้าสำหรับออเดอร์ |
| `POST` | `/orders/:orderId/deposit-cash` | ใส่เงินเข้าออเดอร์ |
| `POST` | `/orders/:orderId/purchase` | ซื้อสินค้า (complete order) |
| `DELETE` | `/orders/:orderId` | ยกเลิกออเดอร์ + คืนเงิน |

**Backend Response Format:**
```typescript
{
  statusCode: number;
  data: {
    // ... actual data
  }
}
```

---

## 💡 Key Features Details

### 🎨 Modal System
แทนที่ `alert()` ของเบราว์เซอร์ด้วย custom modal:
- ✅ Success (สีเขียว) - ซื้อสำเร็จ
- ❌ Error (สีแดง) - เกิดข้อผิดพลาด
- ⚠️ Warning (สีเหลือง) - เงินไม่พอ
- ℹ️ Info (สีน้ำเงิน) - ข้อมูลทั่วไป

### 📦 Stock Management
- แสดงจำนวน stock แบบ real-time
- ลด stock อัตโนมัติหลังซื้อ (ไม่ต้อง refresh)
- สินค้าหมด → disable + แสดง "OUT OF STOCK"

### 🔄 Order Flow
```
[เลือกสินค้า/ใส่เงิน] → สร้าง Order
         ↓
[ใส่เงินเพิ่ม] → Update totalAmount
         ↓
[กด Purchase] → ตรวจสอบเงินพอหรือไม่
         ↓
[ซื้อสำเร็จ] → แสดงเงินทอน + ลด stock
```

---

## 🔒 Environment Variables

สร้างไฟล์ `.env` ที่ root:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:9000/api

# Optional: ถ้ามี features อื่น
# VITE_ENABLE_DEBUG=true
```

---

## 🐛 Troubleshooting (แก้ปัญหา)

### ❌ ปัญหา: CORS Error
**อาการ:** Console แสดง "CORS policy blocked"

**วิธีแก้:**
1. เปิด Backend (NestJS)
2. เพิ่มใน `main.ts`:
```typescript
app.enableCors();
```
3. Restart Backend

---

### ❌ ปัญหา: ไม่เชื่อม Backend ได้
**อาการ:** "Failed to load products" หรือ "Network Error"

**ตรวจสอบ:**
1. ✅ Backend รันอยู่ไหม? (`http://localhost:9000`)
2. ✅ ไฟล์ `.env` ถูกต้องไหม?
3. ✅ เปิด Browser Console ดู error
4. ✅ ลอง curl ทดสอบ:
```bash
curl http://localhost:9000/api/products
```

---

### ❌ ปัญหา: สินค้าไม่แสดง
**วิธีแก้:**
1. ตรวจสอบ Backend ว่า `/products` return data
2. เปิด Network Tab ใน DevTools
3. ตรวจสอบ response format ตรงกับ `ProductAndStock` interface

**Expected Format:**
```typescript
{
  statusCode: 200,
  data: [
    {
      id: "uuid",
      name: "Coca Cola",
      price: 20,
      productStock: {
        quantity: 10
      }
    }
  ]
}
```

---

### ❌ ปัญหา: Tailwind CSS ไม่ทำงาน
**วิธีแก้:**
1. Install Tailwind CSS IntelliSense extension (VS Code)
2. Restart VS Code
3. ตรวจสอบ `tailwind.config.js` มีไฟล์หรือไม่

---

## 📝 License

MIT License - ใช้งานได้อย่างอิสระ

---

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
