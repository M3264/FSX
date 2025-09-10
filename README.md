# FSX - Famous SSR Server for Vite React

> **Get your React Website indexed quickly by Google and Bing** 🎯

A lightweight Server-Side Rendering (SSR) framework for React applications, designed for fast Google and Bing indexing.

## 🚀 What is FSX?

FSX is a development project by **Famous-Tech**, a 14-year-old Haitian developer, created to practice web development and reduce dependence on AI coding assistants. It's like Next.js but lighter, with a focus on SEO optimization.

## ✨ Features

- **Server-Side Rendering** with React 19
- **SEO Optimization** with dynamic meta tags and Schema.org structured data
- **Redis Caching** for pages and images
- **Image Optimization** with WebP conversion (Python scripts)
- **Security** with Helmet.js and Content Security Policy
- **TypeScript Support** with Vite build system
- **Docker Ready** for easy deployment

## 🏗️ Project Structure

```
FSX/
├── src/
│   ├── server/           # Express.js SSR server
│   │   ├── config/       # App configuration
│   │   ├── routes/       # SSR routes and API endpoints
│   │   ├── middleware/   # Custom middleware
│   │   └── utils/        # Server utilities (renderer, redis, etc.)
│   └── client/           # React application
│       ├── components/   # React components
│       ├── pages/        # Page components
│       ├── hooks/        # Custom React hooks
│       └── context/      # React context providers
├── __scripts__/          # Python optimization scripts
│   ├── images.py         # Image download and WebP conversion
│   └── structure.py      # Project structure generator
└── docker/              # Docker configuration
```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, Node.js
- **Caching**: Redis
- **Security**: Helmet.js
- **Build**: Vite
- **Containerization**: Docker
- **Scripts**: Python 3.8+

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- Redis server
- Python 3.8+ (for image optimization scripts)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Famous-Tech/FSX.git
cd FSX
```

2. Install dependencies:
```bash
pnpm install
```

3. Start Redis server:
```bash
# Using Docker
docker run -d -p 6379:6379 redis:alpine
```

4. Start development server:
```bash
pnpm run dev
```

Your application will be available at `http://localhost:3000`

## 📝 Available Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run dev:server` - Start server only
- `pnpm run build:client` - Build client assets
- `pnpm run deploy` - Build and start production server
- `pnpm run start` - Start with PM2

## 🐳 Docker Deployment

```bash
# Build and start with Docker Compose
docker-compose up -d

# Or build manually
docker build -t fsx-app .
docker run -p 3000:3000 fsx-app
```

## 🔧 Configuration

The project uses environment variables for configuration. Key settings include:

- `PORT` - Server port (default: 3000)
- `REDIS_URL` - Redis connection string
- `NODE_ENV` - Environment (development/production)

## 📊 Key Features Explained

### Server-Side Rendering
- Express.js server renders React components to HTML
- Dynamic meta tags for each page
- SEO-friendly URLs and content

### Caching Strategy
- **Page Cache**: 7-day TTL for SSR pages
- **Image Cache**: 24-hour TTL for optimized images
- Redis-based caching for performance

### SEO Optimization
- Schema.org structured data
- Dynamic meta tags per page
- Automatic sitemap and robots.txt
- Open Graph and Twitter Cards support

### Image Optimization
- Python scripts for WebP conversion
- Automatic image compression
- Responsive image serving

## 🧪 Development Notes

This is a **development version** of FSX, not a production NPM package. It's designed for:

- Learning and practicing web development
- Understanding SSR concepts
- Building SEO-optimized React applications
- Reducing dependence on AI coding tools

## 👨‍💻 Author

**Famous-Tech** - 14-year-old Haitian Developer

- GitHub: [@Famous-Tech](https://github.com/Famous-Tech)
- Website: [famoustech.xyz](https://famoustech.xyz)
- Email: famoustechgroup@proton.me

> *"Designed to practice and depend less on AI coding assistants"*

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ in Haiti 🇭🇹**

*Empowering developers to build fast, SEO-friendly React applications*
