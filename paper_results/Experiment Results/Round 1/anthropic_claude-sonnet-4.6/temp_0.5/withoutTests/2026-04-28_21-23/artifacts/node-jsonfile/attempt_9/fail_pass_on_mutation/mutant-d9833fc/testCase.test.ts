import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { spawnSync } from 'child_process';

describe('jsonfile fallback to fs when graceful-fs unavailable', () => {
  it('should still read files correctly when graceful-fs is not available', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
    const tmpFile = path.join(tmpDir, 'data.json');
    const testData = { hello: 'world', num: 42 };
    fs.writeFileSync(tmpFile, JSON.stringify(testData));

    // Create a fake graceful-fs in NODE_PATH location that throws
    const fakeNodePath = path.join(tmpDir, 'fake_modules');
    const fakeGracefulFsDir = path.join(fakeNodePath, 'graceful-fs');
    fs.mkdirSync(fakeGracefulFsDir, { recursive: true });
    fs.writeFileSync(
      path.join(fakeGracefulFsDir, 'index.js'),
      `throw new Error('graceful-fs not available');`
    );
    fs.writeFileSync(
      path.join(fakeGracefulFsDir, 'package.json'),
      JSON.stringify({ name: 'graceful-fs', main: 'index.js' })
    );

    const indexPath = require.resolve('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');

    const scriptPath = path.join(tmpDir, 'test-script.js');
    fs.writeFileSync(scriptPath, `
      // Clear any cached graceful-fs
      Object.keys(require.cache).forEach(k => {
        if (k.includes('graceful-fs') || k.includes('node-jsonfile')) {
          delete require.cache[k];
        }
      });
      const jsonfile = require(${JSON.stringify(indexPath)});
      const result = jsonfile.readFileSync(${JSON.stringify(tmpFile)});
      process.stdout.write(JSON.stringify(result));
    `);

    try {
      const result = spawnSync('node', [scriptPath], {
        cwd: tmpDir,
        encoding: 'utf8',
        env: {
          ...process.env,
          NODE_PATH: fakeNodePath
        }
      });

      if (result.error) throw result.error;
      if (result.status !== 0) {
        throw new Error(`Script failed: ${result.stderr}`);
      }

      const parsed = JSON.parse(result.stdout);
      expect(parsed).toEqual(testData);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});