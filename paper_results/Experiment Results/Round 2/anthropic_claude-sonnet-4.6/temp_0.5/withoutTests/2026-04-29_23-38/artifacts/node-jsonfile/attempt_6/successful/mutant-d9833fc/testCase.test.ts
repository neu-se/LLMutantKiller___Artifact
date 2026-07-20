import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { spawnSync } from 'child_process';

describe('jsonfile fs fallback', () => {
  it('should use native fs as fallback when graceful-fs is unavailable', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
    
    try {
      const tmpFile = path.join(tmpDir, 'data.json');
      const expected = { foo: 'bar', n: 1 };
      fs.writeFileSync(tmpFile, JSON.stringify(expected));

      // Copy the entire node-jsonfile package to tmpDir
      const srcDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/node-jsonfile');
      
      // Copy index.js and utils.js
      fs.copyFileSync(path.join(srcDir, 'index.js'), path.join(tmpDir, 'index.js'));
      fs.copyFileSync(path.join(srcDir, 'utils.js'), path.join(tmpDir, 'utils.js'));
      
      // Copy universalify from the real node_modules
      const universalifyPath = require.resolve('universalify');
      const universalifyDir = path.dirname(universalifyPath);
      const destUniversalify = path.join(tmpDir, 'node_modules', 'universalify');
      fs.mkdirSync(destUniversalify, { recursive: true });
      for (const f of fs.readdirSync(universalifyDir)) {
        fs.copyFileSync(path.join(universalifyDir, f), path.join(destUniversalify, f));
      }
      
      // Create a fake graceful-fs that throws
      const fakeGracefulFs = path.join(tmpDir, 'node_modules', 'graceful-fs');
      fs.mkdirSync(fakeGracefulFs, { recursive: true });
      fs.writeFileSync(path.join(fakeGracefulFs, 'graceful-fs.js'), `throw new Error('graceful-fs not available');`);
      fs.writeFileSync(path.join(fakeGracefulFs, 'package.json'), JSON.stringify({ name: 'graceful-fs', main: 'graceful-fs.js', version: '1.0.0' }));

      const scriptFile = path.join(tmpDir, 'test-script.js');
      const script = `
const jsonfile = require('./index.js');
const result = jsonfile.readFileSync(${JSON.stringify(tmpFile)});
console.log(JSON.stringify(result));
`;
      fs.writeFileSync(scriptFile, script);

      const proc = spawnSync('node', [scriptFile], { 
        encoding: 'utf8',
        cwd: tmpDir
      });
      
      expect(proc.status).toBe(0);
      const result = JSON.parse(proc.stdout.trim());
      expect(result).toEqual(expected);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});