# 🚰 SmartTanker — Real-Time Water Booking & Monitoring Platform

SmartTanker is a modern IoT-enabled platform that connects customers with verified water tanker providers through web and mobile applications.  
It allows **real-time tanker booking**, **GPS tracking**, **automated water level monitoring**, and **digital payments**, making the water delivery process more transparent, reliable, and efficient.

> 🏙️ Built initially for Islamabad and Rawalpindi, with scalability to other cities.

---

## 🧭 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Modules](#-modules)
- [Tech Stack](#-tech-stack)
- [Installation Guide](#-installation-guide)
- [IoT Sensor Integration](#-iot-sensor-integration)
- [API Endpoints (Sample)](#-api-endpoints-sample)
- [Folder Structure](#-folder-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌊 Overview

Due to severe water shortages in urban areas, most households rely on private water tankers. The existing system is **manual and unreliable** — involving phone calls, uncertain pricing, and no way to track deliveries.

**SmartTanker solves this** by providing:
- 📱 An app for customers to book tankers and track orders  
- 🚛 A dashboard for tanker providers to manage bookings  
- 🖥️ An admin panel for pricing, verification, and analytics  
- 🌡️ IoT-based water level detection to automate tanker requests

---

## ✨ Key Features

- 🧑‍💻 **User Authentication & Profiles** — Secure login, registration, and profile management  
- 📊 **Customer Dashboard** — Real-time tank level alerts and order tracking  
- 🌐 **IoT Integration** — Ultrasonic sensors detect tank water level and trigger alerts/bookings  
- 🛰️ **GPS Tracking** — Track tanker live location via Google Maps API  
- 💸 **Digital Payments** — Easypaisa, JazzCash, or card  
- 🧾 **Order History & Notifications** — Complete service transparency  
- 🔐 **Admin Controls** — Complaint handling, pricing regulation, reporting
  

---
## 🧱 System Architecture

[ IoT Sensor ] ---> [ Backend API ] ---> [ Database ]
↑ ↑
[ Customer Web/Mobile App ] [ Provider Dashboard ]
↑
[ Admin Panel ]

yaml
Copy code

- IoT sensor (e.g. ESP8266 + ultrasonic) measures water levels  
- Sends data to backend (Node.js/Django)  
- Data stored in cloud DB (MongoDB/PostgreSQL)  
- Frontend displays live status, bookings, and notifications

---

## 🧩 Modules

| #  | Module Name                     | Description                                                                 |
|----|----------------------------------|------------------------------------------------------------------------------|
| 1  | User Authentication              | Registration, login, profile, token management                              |
| 2  | Customer Dashboard               | Tank level alerts, booking history, active orders                           |
| 3  | Water Level Detection (IoT)      | Ultrasonic sensor detects water levels                                      |
| 4  | Auto-Alert & Notifications       | Low-level alerts via SMS/Push                                               |
| 5  | Tanker Booking                   | Real-time booking & cancellation                                           |
| 6  | GPS Tracking                     | Tanker live location                                                        |
| 7  | Payment                          | Digital payments via Easypaisa/JazzCash                                    |
| 8  | Service Provider Dashboard       | Manage availability and bookings                                           |
| 9  | Delivery Management              | Scheduling and routing                                                     |
| 10 | Admin Management                 | Pricing control, verification, analytics                                   |
| 11 | Database & Cloud                 | Scalable storage on AWS/Firebase                                          |
| 12 | Security & QA                    | Secure communication, testing                                             |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — Customer and provider dashboards  
- Tailwind CSS — UI styling  
- Axios — API calls

### Backend
- **Node.js (Express)** — RESTful APIs  
- JWT + bcrypt — Authentication  
- Multer / Cloud integrations (future modules)

### Database
- MongoDB / PostgreSQL (configurable)

### IoT
- ESP8266 / ESP32  
- Ultrasonic sensor (e.g., HC-SR04)  
- HTTP POST / MQTT for data transmission

### External Integrations
- Google Maps API (GPS tracking)  
- Easypaisa / JazzCash (digital payments)  
- Firebase / AWS (cloud deployment)

---

## ⚡ Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/taimoor897/SmartTanker.git
cd SmartTanker



















































