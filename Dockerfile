FROM node:21

WORKDIR /app

COPY src/ /app

RUN npm ci --omit=dev

ENTRYPOINT [ "npm", "run", "run" ]
