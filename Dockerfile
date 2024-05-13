# Utiliza una imagen base de Node.js
FROM node:14-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos de definición de paquete
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia los archivos del proyecto
COPY . .

# Compila el proyecto TypeScript
RUN npm run build

# Expone el puerto que tu API utiliza
EXPOSE 4000

# Define el comando para correr la aplicación
CMD ["npm", "start"]
