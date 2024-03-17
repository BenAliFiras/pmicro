# Use the official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install any project dependencies
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

# Rebuild the bcrypt module inside the Docker container
RUN npm rebuild bcrypt --build-from-source

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define the command to run your Node.js application
CMD ["node", "app.js"]
