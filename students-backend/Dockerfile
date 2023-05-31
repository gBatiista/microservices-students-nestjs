FROM node:16.14

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot

RUN npm install --ignore-scripts -g @nestjs/cli

COPY docker-entrypoint.sh /

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
