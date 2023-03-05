FROM node:lts-alpine

ARG VERSION

LABEL maintener="Thomas Champagne"
LABEL version=$VERSION

RUN apk update \
    && apk upgrade \
    && apk --no-cache add lm-sensors lm-sensors-detect tzdata

WORKDIR /app

COPY . .
RUN chmod +x ./run.sh

VOLUME /output

CMD ["/app/run.sh"]
