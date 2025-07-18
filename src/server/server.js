require('esbuild-register/dist/node').register();
require('dotenv').config();
// First BIIIIG Project i made at without vibe coding
// But i was in obligation to fix conflicts using chatGPT because it's the first time i use Nodejs simple and React with Typescript in a single project.
const app = require('./config/app');

const routes = require('./routes');

const PORT = process.env.PORT || 3000;

// Utilisation des routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`FAMOUS SSR server is running on http://localhost:${PORT}`);
});