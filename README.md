![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/thomaschampagne/snsr/main.yaml?style=flat-square)
![Docker Pulls](https://img.shields.io/docker/pulls/thomaschampagne/snsr.svg?style=flat-square)

# Snsr
[Snsr](https://hub.docker.com/r/thomaschampagne/snsr) list available host sensors to a parsable JSON file using `lm-sensors` linux package.

# Installation

## Via docker run

In a terminal with docker, paste below:

```bash
docker run --rm \
    --name snsr \
    -e TZ="Europe/Paris" \
    -v $(pwd)/output:/output/ \
    thomaschampagne/snsr:latest
```

Resulting sensors json output will be located in `./output/sensors.json`

# Build image on your own

Clone this repo, then run:

```bash
docker build --no-cache --build-arg VERSION=$(date +%Y%m%d) -t snsr:yourtag .
```
