# Use official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy only package.json & package-lock.json first (to optimize caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose React default port
EXPOSE 3001

# Start React with hot reload
CMD ["npm", "start"]

