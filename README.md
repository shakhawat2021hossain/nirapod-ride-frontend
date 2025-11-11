# 🚖 Nirapord Ride (A Ride Management System)

### 🔗 Live Deployment: https://nirapod-ride-frontend.vercel.app/  

---

## 🧭 Project Overview

**Ride Management System** is a fully responsive, role-based ride booking platform inspired by Uber and Pathao.  
It allows **Riders**, **Drivers**, and **Admins** to seamlessly interact through a clean and intuitive interface — from booking rides to managing operations and analyzing ride data.

This project focuses on building a **production-grade frontend** using **React, Redux Toolkit, and RTK Query**, ensuring efficient state management, secure authentication, and smooth user experience across all devices.

---

## ✨ Core Features

### 🌍 Public Experience
- Beautiful landing page with **5+ structured sections** (Hero, Features, Testimonials, FAQ, etc.)
- **About Us**, **Features**, **Contact**, and **FAQ** pages
- Responsive **navbar** and **footer** with consistent design
- Accessibility and performance optimized (lazy-loading + skeleton loaders)

---

### 👤 Authentication & Authorization
- **JWT-based authentication**
- **Role-based login & registration** for Rider, Driver, and Admin
- Role-based **dashboard redirects** after login
- **Persistent login state**
- Blocked/Suspended account redirection
- Logout functionality

---

### 🚗 Rider Dashboard
- **Request Ride:** Pickup, destination, fare estimate, payment selection  
- **Ride History:** Paginated, searchable, and filterable  
- **Ride Details:** timestamps, and driver info  
- **Profile Management:** Edit name, phone, and change password 

---

### 🧍‍♂️ Driver Dashboard
- **Online/Offline toggle** (to control ride availability)  
- **Incoming Ride Requests:** Accept or reject rides  
- **Active Ride Management:** Track status – *Accepted → Picked Up → In Transit → Completed*  
- **Earnings Dashboard:** Charts and visual data (daily, weekly, monthly)  
- **Ride History:** Paginated and filterable  
- **Profile Management:** Update vehicle info and password  

---

### 🛠️ Admin Dashboard
- **User Management:** Search, filter, block/unblock riders, approve/suspend drivers  
- **Ride Oversight:** View and filter all rides by date, status, or user  
- **Analytics Dashboard:** Charts showing ride volume, revenue, and driver activity  
- **Profile Management:** Update profile and password  
- **Global Search & Filter tools**  

---

### 🆘 SOS / Emergency System 
Enhances user safety by allowing riders and drivers to **quickly call for help** during active rides.

- Floating **SOS button** visible only during rides  
- **Emergency Options:** Call police, notify contacts, share live location  
- **Pre-set Emergency Contact** in user settings  
- **Automatic location sharing** via map API or messaging (WhatsApp, SMS)  
- **Visual feedback** confirmation (“Emergency contact notified!”)

---

### 💎 General UI/UX Enhancements
- Role-based navigation and profile dropdown  
- Interactive carousels, cards, and charts  
- Smooth transitions, skeleton loaders, and global error handling  
- Accessibility-compliant and semantic HTML  
- No broken links or placeholder text  
- **Toast notifications** for success/error using `react-hot-toast`  
- Lazy-loaded maps and charts  

---

## 🧩 Technology Stack

| Category | Tools / Libraries |
|-----------|-------------------|
| **Frontend Framework** | React.js (with React Router) |
| **State Management** | Redux Toolkit, RTK Query |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, ShadCN |
| **Charts & Visualization** | Recharts |
| **Authentication** | JWT + bcrypt (via backend) |
| **Backend (API)** | Node.js, Express.js, MongoDB |

---

## 🔐 Login Credentials

Use the following demo accounts to explore the website:

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

