FROM jtbaird/alpine-node-mongo

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
EXPOSE 3000

CMD [ "npm", "start" ]