# Spur Chat Bot

AI-powered chat application with React, TypeScript, Node.js, and Express. Supports multiple AI providers (Google Gemini, OpenAI, Puter.js) with Redis caching and PostgreSQL.

🌐 **Live Demo**: [https://spur-chat-bot.vercel.app/](https://spur-chat-bot.vercel.app/)

## 📦 Quick Start

```bash
git clone https://github.com/RhythmItaliya/spur_chat_bot.git
cd spur_chat_bot
```

## 🎨 Frontend Setup

**Tech Stack**: React 19.2.3, TypeScript, Tailwind CSS

```bash
cd frontend
npm install
cp .example.env .env
```

Update `.env`:
```env
REACT_APP_API_URL=http://localhost:8080
```

**Run**:
```bash
npm start          # Development
npm run build      # Production
```

Access at [http://localhost:3000](http://localhost:3000)

## ⚙️ Backend Setup

**Tech Stack**: Node.js, Express, TypeScript, PostgreSQL, Redis

**Prerequisites**: PostgreSQL, Redis

```bash
cd backend
npm install
cp .example.env .env
```

Update `.env`:
```env
PORT=8080
DATABASE_URL=postgresql://user:password@localhost:5432/spur
CORS_ORIGINS=http://localhost:3000

# Choose AI provider: google, openai, or puter
AI_PROVIDER=google

# Google Gemini
GOOGLE_API_KEY=your_api_key
GOOGLE_MODEL=gemini-2.0-flash

# OpenAI (optional)
OPENAI_API_KEY=your_api_key
OPENAI_MODEL=gpt-4o-mini

# Puter.js (optional)
PUTER_AUTH_TOKEN=your_token
PUTER_APP_UID=your_app_uid
PUTER_MODEL=gpt-4o-mini

# Redis
REDIS_URL=redis://localhost:6379
CACHE_TTL=600

BACKEND_URL=your_backend_url
```

**Setup database**:
```bash
npx prisma migrate dev
```

**Run**:
```bash
npm run dev        # Development
npm run build && npm start  # Production
```

Access at [http://localhost:8080](http://localhost:8080)

## 🚀 Run Full Stack

**Terminal 1** (Backend):
```bash
cd backend && npm install && npm run dev
```

**Terminal 2** (Frontend):
```bash
cd frontend && npm install && npm start
```

## 👤 Author

Rhythm Italiya

## 📄 License

ISC
