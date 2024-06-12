const util = require('util');
const exec - util.promisify(require('child_process').exec);
const path = require('path');
const fs = require('fs');

// path.join(__dirname, '/path/');
// fs.readFileSync(path)
// fs.writeFileSync(path, content)
