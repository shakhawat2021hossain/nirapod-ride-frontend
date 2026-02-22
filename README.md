# 🚖 Nirapord Ride
**A Role-Based Ride Management Platform Inspired by Uber & Pathao**

---

## 🌟 Overview
Nirapord Ride is a modern, fully responsive ride management system that connects **Riders**, **Drivers**, and **Admins** seamlessly. It provides real-time ride booking, tracking, and management while ensuring security and a smooth user experience across devices.

---

## 🎯 Why This Project?
Managing rides and users efficiently can be challenging. Most platforms struggle with:  
- Role-based access and dashboards  
- Real-time ride updates and status tracking  
- Analytics for operational insights  
- Safety features like emergency support  

Nirapord Ride addresses these challenges with a clean, intuitive interface and robust functionality.

---

## 🧩 Core Features

### 🌍 Public Pages
- Responsive landing page with **Hero, Features, Testimonials, FAQ**  
- About, Features, Contact, and FAQ sections  
- Accessible navbar and footer with consistent design  
- Lazy-loading, skeleton loaders, and performance optimization  

### 👤 Authentication & User Access
- JWT-based login and registration  
- Role-based dashboards: **Rider**, **Driver**, **Admin**  
- Forgot and Reset password via OTP verification  
- Persistent login and blocked account handling  
- Role-based redirection and logout functionality  

### 🚗 Rider Dashboard
- Request rides with pickup, destination, fare estimate, and payment  
- Ride history with pagination, search, and filters  
- Detailed ride info with timestamps and driver details  
- Profile management: name, phone, and password updates  

### 🧍‍♂️ Driver Dashboard
- Online/Offline toggle to control availability  
- Accept or reject ride requests  
- Active ride tracking: *Accepted → Picked Up → In Transit → Completed*  
- Earnings dashboard with charts (daily, weekly, monthly)  
- Ride history and profile management  

### 🛠️ Admin Dashboard
- Manage users: search, filter, block/unblock riders, approve/suspend drivers  
- Ride oversight: filter by date, status, or user  
- Analytics dashboard: ride volume, revenue, driver activity  
- Profile management and global search tools  

### 🆘 SOS / Emergency System
- Floating **SOS button** during active rides  
- Emergency options: call police, notify contacts, share live location  
- Pre-set emergency contacts in user settings  
- Visual confirmation of alerts  

### 💎 UI/UX Enhancements
- Role-based navigation and profile dropdowns  
- Interactive carousels, charts, and cards  
- Smooth transitions, skeleton loaders, and toast notifications  
- Accessibility-compliant and semantic HTML  

---

## 🛠️ Technology Stack

| Category | Tools / Libraries |
|----------|------------------|
| **Frontend** | React.js, TypeScript, React Router |
| **State Management** | Redux Toolkit, RTK Query |
| **Styling** | Tailwind CSS, ShadCN |
| **Charts & Visualization** | Recharts |
| **Authentication** | JWT, bcrypt |
| **Backend (API)** | Node.js, Express.js, MongoDB |

---

## 🎬 Demo

> Full workflow video: [Click Here](https://drive.google.com/file/d/12VkH2RqS2D_MuDPooIidaAoI47ybb_sW/view?usp=sharing)

---

## ⚙️ Getting Started

### Clone the repository
```bash
git clone https://github.com/yourusername/nirapord-ride-frontend.git
cd nirapord-ride
```
### Install dependencies
```bash
npm install
```
### Run locally
```
npm run dev
```

---

## 🌐 Live Demo
🔗 Frontend: https://nirapod-ride-frontend.vercel.app/  
🎥 Full Workflow Video: https://drive.google.com/file/d/12VkH2RqS2D_MuDPooIidaAoI47ybb_sW/view?usp=sharing  

### 🔐 Demo Credentials
Use the following demo accounts to explore different roles:

**Admin Account**  
📧 Email: `admin@nirapod-ride.com`  
🔑 Password: `HelloWorld`  

**Rider Account**  
📧 Email: `rider@ride.com`  
🔑 Password: `123456`  

**Driver Account**  
📧 Email: `driver@ride.com`  
🔑 Password: `123456`  

> ⚠️ These credentials are for testing and demonstration purposes only.  
> Please avoid changing sensitive account information.
