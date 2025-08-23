# ---- build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Se usar Prisma:
# RUN npx prisma generate
RUN npm run build

# ---- runtime
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# Se precisar de assets (e.g. swagger.json gerado no build), copie-os:
# COPY --from=build /app/openapi.json ./openapi.json
EXPOSE 3000
CMD ["node", "dist/main.js"]
