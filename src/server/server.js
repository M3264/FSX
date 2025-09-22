require('esbuild-register/dist/node').register();
require('ignore-styles').default(['.css', '.scss', '.sass']);
require('dotenv').config();


const app = require('./config/app');

const routes = require('./routes');

const PORT = process.env.PORT || 3000;

app.use(routes);

app.listen(PORT, () => {
  console.log(`FAMOUS SSR server is running on http://localhost:${PORT}`);
});