import { readFile } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('jsonfile', () => {
  it('should use fs module as a fallback when graceful-fs fails', async () => {
    const tempDir = 'temp-test-dir';
    fs.mkdirSync(tempDir);
    const filePath = path.join(tempDir, 'test.json');
    fs.writeFileSync(filePath, '{}');

    // Mock the require function to make it throw an error when requiring 'graceful-fs'
    const originalRequire = require;
    const originalFsRequire = require('fs');
    require = (moduleName: string) => {
      if (moduleName === 'graceful-fs') {
        throw new Error('Mocked error');
      } else if (moduleName === 'fs') {
        throw new Error('fs should not be required directly');
      }
      return originalRequire(moduleName);
    };

    try {
      await expect(readFile(filePath)).resolves.not.toThrow();
    } catch (error) {
      expect(error.message).toBe('fs should not be required directly');
    } finally {
      require = originalRequire;
      require('fs'); // restore the original fs module
      rimraf.sync(tempDir);
    }
  });
});