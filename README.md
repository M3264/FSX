# FSX - The next Gen SSR based framework for React developers

> # *Make your React Website indexable in seconds* 

A lightweight Server-Side Rendering (SSR) framework for React applications, designed for fast Google and Bing indexing.

>  ## What is FSX ?

FSX is a development project by **Famous-Tech**, a 14-year-old Haitian developer, created to practice web development and reduce  dependence  on AI coding assistants. It's like Next.js but lighter, with a focus on SEO optimization.

> ## WHY CHOOSE FSX ?

Feel free to use FSX in these cases :

  * You need High level SEO optimizations for your React App.
  * You want SSR functionalities on your React Web App without using Next.js
  * You want a plug & play framework to quickly access SSR benefits.
  * You want total Freedom and control over the code that will be used in your Website
  * You want total freedom on where you can easily host your App
  * You want to experiment FULL STACK development without limitations, as you can have a Node.js Backend & And a React App in the same App while enjoying functionalities of both.



> ## HOW TO USE FSX ?

#### Important : This is a development repo for React-FSX, the Framework. This Guide is just providing enough infos to help you test it


1. Clone the repo into a new folder
   ```bash
   git clone https://github.com/Famous-Tech/FSX my-fsx-app # Call it as you want, that doesn't matter
   ```
2. Enter in the Directory
   ```bash
    cd my-fsx-app # Make sure to use the same name you entered in the first step
   ```

3. Install the dependencies (I recommend using pnpm as package manager for this step)

 ```bash
 pnpm install 
 ```

#### If you don't have pnpm installed run :
```bash
npm i pnpm -g
```

4. Head to [TheSetupDoc](docs/setup.md) for further informations





## Features

- **Server-Side Rendering** with React 19
- **SEO Optimization** with dynamic meta tags and Schema.org structured data
- **Redis Caching** for pages and images
- **Image Optimization** with WebP conversion (Python scripts)
- **Security** with Helmet.js and Content Security Policy
- **TypeScript Support** with Vite build system, as long FSX Compiler isn't ready
- **Docker Ready** for easy deployment


## FSX Tech Stack

- **Frontend**: React 19, TypeScript (JavaScript is natively supported), Tailwind CSS, Vite
- **Backend**: Express.js, Node.js
- **Caching**: Redis
- **Build**: Vite
- **Containerization**: Docker
- **Scripts**: Python 3.8+ (For features FSX doesn't have yet like IMAGE OPTIMIZATION)

##  Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- Redis server
- Python 3.8+ (for image optimization scripts, that will be available as plugin soon as possible)

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

## Available Scripts

- `pnpm run dev` - Start development server, with a new build process, Useful if u updated the Front End
- `pnpm run dev:server` - Start server only
- `pnpm run build:client` - Build client assets
- `pnpm run deploy` - Build and start production server
- `pnpm run start` - Start with PM2

## Docker Deployment

```bash
# Build and start with Docker Compose
docker-compose up -d

# Or build manually
docker build -t fsx-app .
docker run -p 3000:3000 fsx-app
```

## Configuration

The project doesn't need many environment variables. You can easily create a .env file as you make sure to include:

- `PORT` - Server port (default: 3000)
- `REDIS_URL` - Redis connection string


## Development Notes

This is a **development version** of FSX, not a production NPM package. It's designed for:

- Learning and practicing web development
- Understanding SSR, SSG, CSR and Hydration  concepts
- Building SEO-optimized React applications for my clients as i am a web development freelancer
- Reducing **MY** dependence on AI coding tools

FSX is  not completed yet, due to a lack of time as the main developer is still a school boy.
So if u want to contribute, [check out TODO.MD](TODO.md) and the development guide : [development.md](docs/DEVELOPMENT.md) 

##  Author

**Famous-Tech** - 14-year-old Haitian Developer

- GitHub: [@Famous-Tech](https://github.com/Famous-Tech)
- Website: [famoustech.xyz](https://famoustech.xyz)
- Email: famoustechgroup@proton.me

> *"Designed to practice and depend less on AI coding assistants"*


---

**Made with ❤️ in Haiti 🇭🇹**

*Empowering developers to build fast, SEO-friendly React applications*
