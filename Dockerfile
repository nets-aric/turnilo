#
# BUILD stage
#
FROM node:14.15.4 AS build

WORKDIR /usr/src/app

# Install and cache dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy sources (see .dockerignore)
COPY . ./

# Build and test
RUN npm run build

# Prune dev dependencies from node_modules
RUN npm prune --production

#
# RUNTIME stage
#
FROM node:14.15.4-slim as runtime

WORKDIR /app

# Example configuration and packages.json
COPY --from=build /usr/src/app/config-examples.yaml /usr/src/app/package.json /usr/src/app/package-lock.json ./

# Wikiticker dataset
COPY --from=build /usr/src/app/assets ./assets

# Main JS
COPY --from=build /usr/src/app/bin ./bin

# Build results
COPY --from=build /usr/src/app/build ./build

# Dependencies
COPY --from=build /usr/src/app/node_modules ./node_modules

# Expose default port
EXPOSE 9090

ENTRYPOINT [ "node", "bin/turnilo" ]
