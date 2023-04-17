const { exec } = require('child_process');

function encryptShell(text, isKey, key) {
    return new Promise((resolve, reject) => {
      let cmd = `echo -d "${text}" | openssl enc -e -aes-256-cbc -a -salt -k 123456789987654321 -iv aaabbbccc`;  
      if(isKey == true) {
        cmd = `echo -d "${text}" | openssl enc -e -aes-256-cbc -a -salt -k ${key} -iv aaabbbccc`;
      }
      // console.log(cmd);
      exec(cmd, (err, stdout, stderr) => {
          if (err) {
            console.log(`exec error: ${err}`);
            reject(err);
          }
          // console.log(`stdout: ${stdout}`);
          // console.log(`stderr: ${stderr}`);
          resolve(stdout);
        });
    })
}

module.exports = encryptShell;