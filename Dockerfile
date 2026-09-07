# Builds the site with a pinned Hugo version. Dependabot tracks the image tag
# below, so bumping Hugo is a one-line change proposed automatically.
FROM ghcr.io/gohugoio/hugo:v0.165.0 AS build

ARG BASE_URL=https://reaktor23.org
# The image runs as the unprivileged `hugo` user and declares /project as a
# volume, so build into a fresh directory owned by that user instead.
COPY --chown=hugo:hugo . /site
WORKDIR /site
RUN hugo --logLevel info --cleanDestinationDir --baseURL="${BASE_URL}"

# Export stage: only the rendered site, extracted with `docker build --output`.
FROM scratch AS output
COPY --from=build /site/public /
