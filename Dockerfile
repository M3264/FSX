FROM node:20-alpine


WORKDIR /app


COPY package*.json ./

RUN npm install pm2 -g
RUN npm install pnpm -g 


RUN pnpm install



ENV PM2_PUBLIC_KEY 6ly4glzdvtbqbv6
ENV PM2_SECRET_KEY phd5mhn596a29r3


COPY . .


EXPOSE 3000

# Étape 7 : Lancer l'app
CMD ["pnpm", "run", "deploy"]
