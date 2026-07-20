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

    // Find the actual graceful-fs location
    const gracefulFsMain = require.resolve('graceful-fs');
    const gracefulFsDir = path.dirname(gracefulFsMain);
    const backupDir = path.join(tmpDir, 'graceful-fs-backup');

    // Back up the real graceful-fs main file and replace with throwing version
    const originalContent = fs.readFileSync(gracefulFsMain, 'utf8');
    
    const indexPath = require.resolve('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');

    const scriptPath = path.join(tmpDir, 'test-script.js');
    fs.writeFileSync(scriptPath, `
      const jsonfile = require(${JSON.stringify(indexPath)});
      const result = jsonfile.readFileSync(${JSON.stringify(tmpFile)});
      process.stdout.write(JSON.stringify(result));
    `);

    try {
      // Replace graceful-fs with a throwing version
      fs.writeFileSync(gracefulFsMain, `throw new Error('graceful-fs not available');`);

      const result = spawnSync('node', [scriptPath], {
        encoding: 'utf8',
        env: { ...process.env }
      });

      // Restore immediately
      fs.writeFileSync(gracefulFsMain, originalContent);

      if (result.error) throw result.error;
      if (result.status !== 0) {
        throw new Error(`Script failed: ${result.stderr}`);
      }

      const parsed = JSON.parse(result.stdout);
      expect(parsed).toEqual(testData);
    } finally {
      // Ensure restoration
      try { fs.writeFileSync(gracefulFsMain, originalContent); } catch {}
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});