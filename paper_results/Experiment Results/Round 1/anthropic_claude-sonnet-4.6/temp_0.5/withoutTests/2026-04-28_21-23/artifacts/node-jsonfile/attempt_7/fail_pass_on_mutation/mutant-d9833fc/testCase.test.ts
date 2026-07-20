import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { execSync } from 'child_process';

describe('jsonfile fallback to fs when graceful-fs unavailable', () => {
  it('should still read files correctly when graceful-fs is not available', () => {
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `test-jsonfile-fallback.json`);
    const testData = { hello: 'world', num: 42 };
    fs.writeFileSync(tmpFile, JSON.stringify(testData));

    // Find where graceful-fs is installed
    const gracefulFsDir = path.dirname(require.resolve('graceful-fs'));
    const gracefulFsParent = path.dirname(gracefulFsDir);
    const renamedDir = path.join(gracefulFsParent, 'graceful-fs-disabled');

    try {
      // Temporarily rename graceful-fs so it can't be found
      fs.renameSync(gracefulFsDir, renamedDir);

      // Run a small script that uses jsonfile
      const indexPath = require.resolve('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
      const script = `
        const jsonfile = require(${JSON.stringify(indexPath)});
        const result = jsonfile.readFileSync(${JSON.stringify(tmpFile)});
        process.stdout.write(JSON.stringify(result));
      `;

      const output = execSync(`node -e "${script.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`, {
        encoding: 'utf8'
      });

      const result = JSON.parse(output);
      expect(result).toEqual(testData);
    } finally {
      // Restore graceful-fs
      if (fs.existsSync(renamedDir)) {
        fs.renameSync(renamedDir, gracefulFsDir);
      }
      fs.unlinkSync(tmpFile);
    }
  });
});