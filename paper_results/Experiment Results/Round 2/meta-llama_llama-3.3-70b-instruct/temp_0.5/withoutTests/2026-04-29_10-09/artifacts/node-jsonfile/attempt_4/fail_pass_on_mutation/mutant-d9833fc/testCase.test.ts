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
    require = (moduleName: string) => {
      if (moduleName === 'graceful-fs') {
        throw new Error('Mocked error');
      }
      return originalRequire(moduleName);
    };

    try {
      await expect(readFile(filePath)).resolves.not.toThrow();
    } catch (error) {
      // If the mutated code is used, this should throw an error
      expect(true).toBe(false); // Should not reach here
    } finally {
      require = originalRequire;
      rimraf.sync(tempDir);
    }
  });
});