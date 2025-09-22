FROM node:20-alpine


WORKDIR /app


COPY package*.json ./

RUN npm install pm2 -g
RUN npm install pnpm -g 


RUN pnpm install


COPY . .


EXPOSE 3000

# Étape 7 : Lancer l'app
CMD ["pnpm", "run", "deploy"]
