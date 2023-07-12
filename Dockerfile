FROM node:lts-alpine AS development
# FROM node:14-alpine
# ENV NODE_ENV development
# Add a work directory
# WORKDIR /SnakeGame
# RUN npm install -g json-server
WORKDIR /apiary
# Cache and Install dependencies
# COPY package.json .
COPY package.json .

# COPY yarn.lock .
# RUN yarn install
RUN npm install
# Copy app files
# RUN npm install nodemon --save-dev
COPY . .
# Expose port
EXPOSE 8080
# Start the app
CMD ["npm", "run", "dev"]
# CMD ["nodemon", "--exec", "npm", "start"]
# build stage
# FROM node:lts-alpine as build-stage
# WORKDIR /apiary
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # production stage
# # FROM nginx:stable-alpine as production-stage
# # COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# # CMD ["nginx", "-g", "daemon off;"]
# CMD ["npm", "run", "dev"]