# Etapa 1: build de la app con Vite
FROM node:20-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: servir con Nginx
FROM nginx:alpine

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos de build de Vite
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
