import { exec } from "child_process";

export class Snsr {
  static SENSOR_CMD = "sensors -Au";

  static get() {
    return new Promise((resolve, reject) => {
      exec(this.SENSOR_CMD, (err, stdout, stderr) => {
        if (err || stderr) {
          reject(err || stderr);
        } else {
          resolve(this.parseSensorOutput(stdout));
        }
      });
    });
  }

  static parseSensorOutput(sensorData) {
    sensorData = sensorData
      .split(/\n\n+/g)
      .reduce((result, sensor) => {
        let chip = null;
        let snsr = null;
        return result.concat(
          sensor.split(/\n/g).reduce((result, value, i) => {
            if (i === 0) {
              chip = value;
            } else if (value[0] !== " ") {
              snsr = value.replace(/:$/, "");
            } else {
              const match = value.match(
                /^  ((temp|fan|intrusion|in|power|beep)([0-9]+)?_([a-z\_]+)): ([0-9]+(\.[0-9]+)?)$/
              );

              if (match) {
                result.push({
                  chip,
                  sensor: snsr,
                  label: match[1],
                  type: match[2],
                  num: match[3],
                  key: match[4],
                  value: parseFloat(match[5]),
                });
              }
            }
            return result;
          }, [])
        );
      }, [])
      .reduce((result, value) => {
        if (!result[`${value.chip}-${value.sensor}`])
          result[`${value.chip}-${value.sensor}`] = [];
        result[`${value.chip}-${value.sensor}`].push(value);
        return result;
      }, {});

    sensorData = Object.keys(sensorData).map(k =>
      sensorData[k].reduce(
        (x, { key, value }) => {
          x[key] = value;
          return x;
        },
        {
          chip: sensorData[k][0].chip,
          name: sensorData[k][0].sensor,
          type: sensorData[k][0].type,
          num: !!sensorData[k][0].num
            ? parseInt(sensorData[k][0].num, 10)
            : null,
        }
      )
    );

    return sensorData;
  }
}
