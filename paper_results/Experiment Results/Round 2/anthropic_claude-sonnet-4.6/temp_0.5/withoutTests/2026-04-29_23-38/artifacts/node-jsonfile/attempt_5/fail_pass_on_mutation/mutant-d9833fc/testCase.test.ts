import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { spawnSync } from 'child_process';

describe('jsonfile fs fallback', () => {
  it('should use native fs as fallback when graceful-fs is unavailable', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
    const tmpFile = path.join(tmpDir, 'data.json');
    const expected = { foo: 'bar', n: 1 };
    fs.writeFileSync(tmpFile, JSON.stringify(expected));

    // Create a fake node_modules/graceful-fs that throws
    const fakeModulesDir = path.join(tmpDir, 'node_modules', 'graceful-fs');
    fs.mkdirSync(fakeModulesDir, { recursive: true });
    fs.writeFileSync(
      path.join(fakeModulesDir, 'index.js'),
      `throw new Error('graceful-fs not available');`
    );
    fs.writeFileSync(
      path.join(fakeModulesDir, 'package.json'),
      JSON.stringify({ name: 'graceful-fs', main: 'index.js', version: '1.0.0' })
    );

    const jsonfilePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
    const scriptFile = path.join(tmpDir, 'test-script.js');
    
    const script = `
const jsonfile = require(${JSON.stringify(jsonfilePath)});
const result = jsonfile.readFileSync(${JSON.stringify(tmpFile)});
console.log(JSON.stringify(result));
`;
    
    fs.writeFileSync(scriptFile, script);
    
    try {
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