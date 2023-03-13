#!/bin/sh
logDate() {
  date +'[%Y-%m-%d %H:%M:%S]'
}

echo "$(logDate) Creating /output directory..."
mkdir /output
echo "$(logDate) /output directory created"

echo "$(logDate) Detecting sensors..."
sensors-detect --auto > /output/sensors-detect.log
echo "$(logDate) Sensors detected. Output in /output/sensors-detect.log"

echo "$(logDate) Parsing sensors..."
node ./src/index.mjs
echo "$(logDate) Sensors parsed. Results in /output/sensors.json"
