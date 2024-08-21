# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine as base


WORKDIR /app

# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Create a non-privileged user that the app will run under.
# See https://docs.docker.com/go/dockerfile-user-best-practices/
ARG UID=10001
RUN adduser \
    --disabled-password \   
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser


# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Copy the source code into the container.
COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Switch to the non-privileged user to run the application.
USER appuser

# Expose the port that the application listens on.
EXPOSE 8080

# Run the application.
CMD [ "node", "dist/main.js" ]