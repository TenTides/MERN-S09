# Use an official Node.js runtime as a base image
FROM node:latest

# Set the working directory in the container
WORKDIR /MERN-S09/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install backend dependencies
#RUN npm install --lts
#RUN npm install nodemailer
#RUN npm install bcrypt
#RUN npm install uuid

# Copy the backend application code to the container
#COPY . .

# Expose port for the backend
EXPOSE 3001

# Command to run the backend server
CMD ["npm", "run", "dev"]
