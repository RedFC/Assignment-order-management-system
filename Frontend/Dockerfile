# Stage 1: Build the React app
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app with a lightweight server
FROM nginx:alpine

# Copy the custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that the app will run on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]