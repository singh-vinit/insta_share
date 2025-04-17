# 🚀 Insta-Share

**Insta-Share** is a fast and simple file sharing platform that allows users to upload any type of file (PDF, PNG, DOCX, etc.). Files are stored in Supabase buckets, and users receive a shortened URL and a QR code for effortless sharing.

## ✨ Features

- 📁 Upload any file type (PDF, PNG, DOCX, etc.)
- ☁️ Stores files securely in Supabase Storage
- 🔗 Generates a public URL for each uploaded file
- ✂️ Shortens the file URL for easy sharing
- 📱 Creates a QR code from the shortened URL

## 🛠 Tech Stack

- **Frontend:** Next.js, TailwindCss
- **Backend/Storage:** Supabase (Buckets, database)
- **QR Code Generation:** [`qrcode`](https://www.npmjs.com/package/qrcode)
- **URL Shortener:** Custom shortening logic
