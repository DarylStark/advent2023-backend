FROM node

WORKDIR /app

COPY src/ /app

RUN npm ci --omit=dev

ENTRYPOINT [ "npm", "run", "run" ]
