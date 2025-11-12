# 💬 PulseTalk

[![Vercel Deploy](https://vercelbadge.vercel.app/api/SHIWA6/PulseTalk)](https://pulse-talk-l9dd.vercel.app)
[![Render Backend](https://img.shields.io/badge/Backend-Render-blue)](https://pulsetalk-backend.onrender.com)
[![Database-Neon](https://img.shields.io/badge/Database-Neon-green)](https://neon.tech)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

> **PulseTalk** is a real-time chat application built with **Next.js**, **Socket.io**, **NextAuth.js**, and **PostgreSQL (Neon)**.  
> The **frontend** runs on **Vercel**, **backend** on **Render**, and **database** on **Neon.tech** — giving a lightning-fast and scalable chat experience.

---

## 🚀 Tech Stack

| Layer | Technology | Hosted On |
|:------|:------------|:-----------|
| **Frontend** | Next.js (TypeScript, TailwindCSS, ShadCN UI) | [Vercel](https://vercel.com) |
| **Backend** | Node.js + Express + Socket.io | [Render](https://render.com) |
| **Database** | PostgreSQL + Prisma ORM | [Neon.tech](https://neon.tech) |
| **Auth** | NextAuth.js + Google OAuth | — |

---

## ⚙️ Environment Setup

### 🧩 Frontend (`.env.local` / Vercel → Environment Variables)
```bash
NEXT_PUBLIC_SOCKET_URL=https://pulsetalk-backend.onrender.com
NEXTAUTH_URL=https://pulse-talk-l9dd.vercel.app
NEXTAUTH_SECRET=your_generated_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DATABASE_URL=postgresql://neondb_owner:npg_x5Ruyq0rEpSL@ep-old-sunset-a4bo00r2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

[Frontend - Vercel]  <--->  [Backend - Render]  <--->  [Database - Neon]
     Next.js                  Express + Socket.io         PostgreSQL via Prisma
✨ Features

        ⚡ Real-time chat via Socket.io

       💬 Room-based conversations

      🔐 Google sign-in (NextAuth)

      🗄️ PostgreSQL + Prisma ORM

      🎨 Responsive modern UI (Tailwind + ShadCN)

      ☁️ Fully deployed cloud architecture

🔮 Roadmap

    ✅ Persist messages in DB

    ✅ Typing indicators

    ✅ gif & emoji uploads (Cloudinary)

    ✅ Push notifications

    ✅ Group chat support


Fork this repo

Create a branch

🧾 License

Copyright (c) 2025 Abhinav Sir (Leader)
Copyright (c) 2025 Shiwa pandey (Contributor)


🏁 Final Notes

PulseTalk is built to demonstrate real-world full-stack developer skills:

TypeScript & Next.js mastery

Real-time communication architecture

Secure OAuth integration

Full CI/CD deployment across Vercel + Render + Neon

It’s fast, clean, production-ready — 

⭐ Star this repo if you like it!
