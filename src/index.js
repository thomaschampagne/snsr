import fs from "fs";
import { Snsr } from "./snsr.js";

Snsr.get()
  .then(output => {
    const sensorsOutput = JSON.stringify(output, null, 2);
    const directoryOutput = "/output";

    // Create dir if missing
    if (!fs.existsSync(directoryOutput)) {
      fs.mkdirSync(directoryOutput);
    }

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
