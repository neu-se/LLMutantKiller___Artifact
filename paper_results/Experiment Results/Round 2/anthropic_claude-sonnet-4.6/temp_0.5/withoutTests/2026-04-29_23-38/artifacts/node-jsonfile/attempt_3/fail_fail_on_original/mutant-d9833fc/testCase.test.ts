import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { execSync } from 'child_process';

describe('jsonfile fs fallback', () => {
  it('should use native fs as fallback when graceful-fs is unavailable', () => {
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `jsonfile-test-${process.pid}.json`);
    const expected = { foo: 'bar', n: 1 };
    fs.writeFileSync(tmpFile, JSON.stringify(expected));

    // Create a script that overrides require to make graceful-fs throw
    const scriptFile = path.join(tmpDir, `test-script-${process.pid}.js`);
    const jsonfilePath = path.resolve('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
    
    const script = `
const Module = require('module');
const originalLoad = Module._load;
Module._load = function(request, ...args) {
  if (request === 'graceful-fs') {
    throw new Error('Cannot find module graceful-fs');
  }
  return originalLoad.call(this, request, ...args);
};

const jsonfile = require(${JSON.stringify(jsonfilePath)});
const result = jsonfile.readFileSync(${JSON.stringify(tmpFile)});
console.log(JSON.stringify(result));
`;
    
    fs.writeFileSync(scriptFile, script);
    
    try {
      const output = execSync(`node ${scriptFile}`, { encoding: 'utf8' }).trim();
      const result = JSON.parse(output);
      expect(result).toEqual(expected);
    } finally {
      fs.unlinkSync(tmpFile);
      fs.unlinkSync(scriptFile);
    }
  });
});