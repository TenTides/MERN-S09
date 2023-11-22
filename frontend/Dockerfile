# Use an official Node.js runtime as a base image for building the frontend
FROM node:latest as builder

# Set the working directory in the container
WORKDIR /MERN-S09/frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install frontend dependencies
#RUN npm install --lts

# Copy the frontend application code to the container
#COPY . .

# Build the frontend application
RUN npm run build

# Use a lightweight Nginx image to serve the built frontend
FROM nginx:alpine

# Copy the built app from the builder stage to the Nginx public directory
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Expose port for the frontend
EXPOSE 80

# Command to run the frontend server
CMD ["npm", "start"]
