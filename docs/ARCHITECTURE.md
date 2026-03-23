# 🏗️ Architecture Overview

Technical architecture of the CNZR Framework website.

## 📐 System Architecture

```
┌─────────────────────────────────────────────┐
│           Client (Browser)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  HTML    │  │   CSS    │  │    JS    │  │
│  │  (EJS)   │  │(Tailwind)│  │ (Vanilla)│  │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
                    │
                    │ HTTP/HTTPS
                    ▼
┌─────────────────────────────────────────────┐
│         CNZR Framework Server                │
│  ┌──────────────────────────────────────┐   │
│  │         Middleware Stack              │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐   │   │
│  │  │ Logger │ │  CORS  │ │Compress│   │   │
│  │  └────────┘ └────────┘ └────────┘   │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │         Plugin System                 │   │
│  │  • Response Time                      │   │
│  │  • Security Headers                   │   │
│  │  • Request ID                         │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │         Router                        │   │
│  │  • Context API                        │   │
│  │  • Dynamic Routes                     │   │
│  │  • File-based Routes                  │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │    Session & Cookie Manager           │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

## 🗂️ Directory Structure

```
cnzr-website/
├── public/              # Static assets
│   ├── styles.css      # Tailwind input
│   ├── output.css      # Generated CSS
│   ├── app.js          # Client JavaScript
│   └── favicon.svg     # Site icon
│
├── views/              # EJS templates
│   ├── index.ejs       # Homepage
│   ├── docs.ejs        # Documentation
│   └── playground.ejs  # API Playground
│
├── routes/             # File-based routes
│   ├── index.js        # Root route
│   └── api/
│       ├── test.js
│       └── users/
│           └── [id].js
│
├── docs/               # Documentation
│   ├── API.md
│   ├── QUICKSTART.md
│   ├── DEPLOYMENT.md
│   ├── EXAMPLES.md
│   ├── FEATURES.md
│   └── ARCHITECTURE.md
│
├── server.js           # Main server
├── tailwind.config.js  # Tailwind config
├── package.json        # Dependencies
└── README.md           # Project readme
```

## 🔄 Request Flow

```
1. Client Request
   ↓
2. Middleware Stack
   ├─ Logger (log request)
   ├─ CORS (handle CORS)
   ├─ Compression (compress response)
   └─ Custom middleware
   ↓
3. Plugin Hooks
   ├─ onRequest
   └─ Request ID generation
   ↓
4. Router
   ├─ Match route
   ├─ Extract params
   └─ Load handler
   ↓
5. Route Handler
   ├─ Access context (ctx)
   ├─ Process request
   └─ Generate response
   ↓
6. Plugin Hooks
   ├─ onResponse
   └─ Response time tracking
   ↓
7. Response
   └─ Send to client
```

## 🧩 Component Breakdown

### Server (server.js)
- Initialize CNZR app
- Configure plugins
- Define routes
- Error handling
- Start server

### Views (EJS Templates)
- Homepage: Hero, features, stats
- Docs: Complete documentation
- Playground: Interactive testing

### Styles (Tailwind CSS)
- Pixel art theme
- Custom utilities
- Responsive design
- Animations

### Routes (File-based)
- API endpoints
- Dynamic parameters
- HTTP method exports

## 🔌 Plugin Architecture

```javascript
Plugin {
  name: string
  dependencies?: string[]
  hooks: {
    onRequest?: (ctx) => void
    onResponse?: (ctx) => void
    onError?: (error, ctx) => void
  }
}
```

## 📊 Data Flow

```
Request → Context → Handler → Response
   ↓         ↓          ↓         ↓
 Headers   Params    Process   Headers
  Body     Query     Logic      Body
 Cookies   State    Database   Status
```

## 🎯 Design Patterns

### 1. Context Pattern
All request/response data in single object

### 2. Plugin Pattern
Extensible via hooks

### 3. Middleware Pattern
Chain of responsibility

### 4. MVC Pattern
Model-View-Controller separation

## 🔒 Security Layers

1. CORS Protection
2. Security Headers
3. Session Security
4. Cookie Security
5. Input Validation
6. Error Handling

## ⚡ Performance

- Compression enabled
- Static file caching
- Response time tracking
- Efficient routing

---

Built with CNZR Framework 🚀
