# Structure of the project

```text

server/
├── index.js (fichier principal)
├── config/
│   └── app.js (configuration Express)
├── routes/
│   ├── index.js (routes principales)
│   ├── health.js (route de santé)
│   └── ssr.js (Server-Side Rendering)
├── middleware/
│   └── errorHandler.js (gestion d'erreurs)
└── utils/
    └── renderer.js (logique de rendu SSR)
    
```
