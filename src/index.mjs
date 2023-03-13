import fs from "fs";
import { Snsr } from "./snsr.mjs";

const directoryOutput = "/output";

Snsr.get()
  .then(output => {
    const sensorsOutput = JSON.stringify(output, null, 2);
    
    // Save sensor output
    fs.writeFile(`${directoryOutput}/sensors.json`, sensorsOutput, err => {
      if (err) {
        console.error(err);
      }
    });
  })
  .catch(err => {
    console.error(err.message || err);
    console.error(
      "Please ensure 'lm-sensors' package is installed on host system"
    );
  });
