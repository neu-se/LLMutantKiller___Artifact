import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { spawnSync } from 'child_process';

describe('jsonfile fs fallback', () => {
  it('should use native fs as fallback when graceful-fs is unavailable', () => {
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `jsonfile-test-${process.pid}.json`);
    const expected = { foo: 'bar', n: 1 };
    fs.writeFileSync(tmpFile, JSON.stringify(expected));

    // Use __dirname to get the actual absolute path
    const jsonfilePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
    const scriptFile = path.join(tmpDir, `test-script-${process.pid}.js`);
    
    const script = `
const Module = require('module');
const originalLoad = Module._load;
let jsonfileLoading = false;
Module._load = function(request, parent, isMain) {
  if (request === 'graceful-fs' && !jsonfileLoading) {
    throw new Error('Cannot find module graceful-fs');
  }
  return originalLoad.call(this, request, parent, isMain);
};
jsonfileLoading = true;
const jsonfile = require(${JSON.stringify(jsonfilePath)});
jsonfileLoading = false;
const result = jsonfile.readFileSync(${JSON.stringify(tmpFile)});
console.log(JSON.stringify(result));
`;
    
    fs.writeFileSync(scriptFile, script);
    
    try {
      const proc = spawnSync('node', [scriptFile], { encoding: 'utf8' });
      expect(proc.status).toBe(0);
      const result = JSON.parse(proc.stdout.trim());
      expect(result).toEqual(expected);
    } finally {
      fs.unlinkSync(tmpFile);
      if (fs.existsSync(scriptFile)) fs.unlinkSync(scriptFile);
    }
  });
});