# **🎱 Babyfoot Manager**

A lightweight manager for organizing **babyfoot games**, players, and matches. Designed to schedule and organize matches with a **live group chat 💬**. Developed as a **Server-Side Rendering (SSR)** application using **EJS** and **Socket.IO** for real-time interactions ⚡.

---

## **✨ Features**

* 📅 Schedule matches between players
* ⚡ Realtime UI updates for matches and chat
* 💬 Live group chat for app users
* 🛑 End and remove matches
* 🐳 Dockerfile for easy containerized deployment
* ☸️ Helm chart for Kubernetes deployment

---

## **🚀 Quick Start**

### **Prerequisites**

* 🟢 Node.js **20+**
* 📦 npm
* 🐘 PostgreSQL database for match tracking

### **Install**

```bash
git clone https://github.com/khemiri22/babyfoot-manager.git
cd babyfoot-manager
npm install
```

### **Run**

```bash
npm start
```

> The app should now be running on the port defined in your `.env` (default: 3000) 🌐

---

## **⚙️ Configuration**

Add or edit the following variables in `.env`:

```env
PORT=3000           # 🖥 Babyfoot Manager app port
DB_HOST=127.0.0.1   # 🐘 Database host or IP
DB_USER=user        # 👤 Database user
DB_PASSWORD=password # 🔑 Database password
DB_NAME=babyfoot_db # 🗄 Database name
DB_PORT=5432        # 🚪 PostgreSQL port
```

---

## **🎮 Basic Usage**

1. Open the web UI at `http://localhost:3000` 🌐
2. ➕ Create matches between players
3. 🛑 End and delete matches
4. 💬 Chat with other users in real time

---

## **🛠 Tech Stack**

* **Backend:** Node.js + Express + EJS (SSR)
* **Real-time:** Socket.IO ⚡
* **Database:** PostgreSQL 🐘
* **Deployment:** Docker 🐳 + Helm ☸️