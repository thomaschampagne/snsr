#!/bin/sh
logDate() {
  date +'[%Y-%m-%d %H:%M:%S]'
}

echo "$(logDate) Detecting sensors..."
sensors-detect --auto > /output/detect.log
echo "$(logDate) sensors-detect output in /output/detect.log"
echo "$(logDate) Parsing sensors..."
node ./src/index.js
echo "$(logDate) Parsing done. Results in /output/sensors.json"
