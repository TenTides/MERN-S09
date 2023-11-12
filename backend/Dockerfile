# Use an official Node.js runtime as a base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the backend application code to the container
COPY . .

# Expose port 3001 for the backend
EXPOSE 3001

# Command to run the backend server
CMD ["npm", "start"]
