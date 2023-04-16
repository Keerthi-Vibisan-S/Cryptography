const { exec } = require('child_process');

function encryptShell(command) {
    return new Promise((resolve, reject) => {
        exec('dir /S', (err, stdout, stderr) => {
            if (err) {
              console.error(`exec error: ${err}`);
                reject();
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            resolve(stdout);
          });
    })
}

module.exports = encryptShell;