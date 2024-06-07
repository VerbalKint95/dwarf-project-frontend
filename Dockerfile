# Utilisez une image Node.js officielle comme image de base
FROM node:18-alpine

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez tous les fichiers du projet dans le répertoire de travail
COPY . .

# Construisez l'application Next.js
RUN npm run build

# Exposez le port sur lequel l'application va tourner
EXPOSE 3000

# Commande pour démarrer l'application Next.js
CMD ["npm", "start"]
