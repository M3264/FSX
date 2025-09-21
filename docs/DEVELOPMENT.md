# FSX Development Documentation

## Project Overview

FSX is a development project that implements Server-Side Rendering (SSR) for React applications using Express.js. The main goal is to create a lightweight alternative to Next.js with a focus on SEO optimization.

## Architecture

### Server Side (`src/server/`)

**Main Components:**
- `server.js` - Entry point, starts Express server
- `config/app.js` - Express configuration with security middleware
- `routes/ssr.js` - Handles all client-side routes with SSR
- `utils/renderer.js` - Renders React components to HTML
- `utils/redis.js` - Redis connection and caching utilities

**Key Features:**
- Express.js server with SSR rendering
- Redis caching for pages and images
- Security headers with Helmet.js
- Compression middleware
- Error handling middleware

### Client Side (`src/client/`)

**Main Components:**
- `App.tsx` - Main React application with routing
- `components/` - Reusable React components
- `pages/` - Page components for different routes
- `hooks/` - Custom React hooks
- `context/` - React context providers

**Key Features:**
- React 19 with TypeScript
- React Router for client-side routing
- Tailwind CSS for styling
- Schema.org structured data
- Performance monitoring hooks

## How SSR Works

1. **Request Flow:**
   ```
   Browser Request → Express Server → Check Redis Cache
   ↓
   Cache Hit: Return cached HTML
   Cache Miss: Stream the React App to the client (A close to < 100ms step)→  Return HTML → Cache 
   ```

2. **Rendering Process:**
   - Express server receives request
   - Checks Redis cache for existing HTML
   - If not cached, renders React app with `renderToPipeableStream`
   - Generates complete HTML with meta tags
   - Caches the result in Redis
   - Returns HTML to browser

3. **Client Hydration:**
   - Browser receives HTML
   - React app hydrates on the client
   - Continues as SPA for navigation

## Caching Strategy

### Page Caching
- **Key Format:** `SSR:${url}`
- **TTL:** 7 days (604800 seconds)
- **Content:** Full HTML with meta tags

### Image Caching
- **Key Format:** `IMG:${url}`
- **TTL:** 24 hours (86400 seconds)
- **Content:** Base64 encoded images

## SEO Features

### Meta Tags
- Dynamic meta tags per page
- Open Graph and Twitter Cards
- Structured data with Schema.org
- Automatic sitemap and robots.txt

### Performance
- Core Web Vitals monitoring
- Page load timing
- User interaction tracking
- Google Analytics integration

## Python Scripts (`__scripts__/`)

### Image Optimization (`images.py`)
- Downloads images from URLs
- Converts to WebP format
- Optimizes file size
- Generates mapping for React components

### Structure Generator (`structure.py`)
- Generates project structure documentation
- Counts lines of code
- Creates markdown documentation
- Analyzes file types and sizes

## Development Workflow

### Local Development
1. Start Redis server
2. Run `pnpm run dev`
3. Access application at `http://localhost:3000`
4. Server restart for server changes

### Building for Production
1. Run `pnpm run build:client` to build React app
2. Run `pnpm run deploy` to build and start production server
3. Use PM2 for process management

## Configuration

### Environment Variables
- `PORT` - Server port (default: 3000)
- `REDIS_URL` - Redis connection string
- `NODE_ENV` - Environment mode

### Meta Data Configuration
Page meta data is configured in `src/server/utils/renderer.js`:

```javascript
const pageMetaData = {
  '/': {
    title: 'Home - Your App',
    description: 'Home page description',
    url: 'https://yourdomain.com'
  }
};
```

## Security Features

### Helmet.js Configuration
- XSS protection
- Clickjacking prevention
- MIME type sniffing protection
- Content Security Policy (CSP)

### Input Validation
- URL validation for SSR routes
- Request size limits
- Error handling with graceful fallbacks

## Performance Optimizations

### Server Side
- Redis caching for pages and images
- Compression with gzip/brotli
- Static asset optimization
- Error handling middleware

### Client Side
- Code splitting with React Lazy and Vite SSR
- Lazy loading of components
- Image optimization with WebP
- Performance monitoring (In next commits)

## Docker Support

### Development
```bash
docker-compose up -d
```

### Production
```bash
docker build -t fsx-app .
docker run -p 3000:3000 fsx-app
```

## Troubleshooting

### Common Issues
1. **Redis Connection Errors** - Check Redis server status
2. **SSR Rendering Issues** - Check React component errors
3. **Build Errors** - Verify Vite configuration
4. **Performance Issues** - Monitor Redis cache hit rates

### Debug Mode
Enable debug logging by setting `NODE_ENV=development`

## Future Improvements

### Planned Features
- Image optimization API
- Static site generation
- Plugin system
- CLI tool for project initialization

### Performance Enhancements
- Edge caching
- CDN integration
- Bundle size optimization
- Advanced monitoring

## Contributing

This is a development project for learning purposes. Contributions are welcome for:
- Bug fixes
- Performance improvements
- Documentation updates
- Feature enhancements

## Notes

- This is a **development version**, not a production NPM package
- Designed for learning and practicing web development
- Focus on reducing dependence on AI coding tools
- Built by a 14-year-old Haitian developer
