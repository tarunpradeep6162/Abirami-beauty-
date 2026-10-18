FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
COPY api/package.json ./api/package.json
COPY web/package.json ./web/package.json
RUN npm ci --workspace api --omit=dev
COPY api/src ./api/src
COPY api/sql ./api/sql
RUN mkdir /data && chown node:node /data
WORKDIR /app/api
USER node
ENV NODE_ENV=production PRIVATE_UPLOAD_DIR=/data
EXPOSE 4000
CMD ["node","src/server.mjs"]
