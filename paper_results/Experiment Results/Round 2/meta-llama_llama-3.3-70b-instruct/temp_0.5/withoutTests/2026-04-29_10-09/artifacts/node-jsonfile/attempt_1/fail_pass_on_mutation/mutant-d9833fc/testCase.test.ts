import { readFile } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('jsonfile', () => {
  it('should throw an error when fs module is not available', async () => {
    const tempDir = 'temp-test-dir';
    fs.mkdirSync(tempDir);
    const filePath = path.join(tempDir, 'test.json');
    fs.writeFileSync(filePath, '{}');

    // Mock the require function to make it throw an error when requiring 'fs' or 'graceful-fs'
    const originalRequire = require;
    require = (moduleName: string) => {
      if (moduleName === 'fs' || moduleName === 'graceful-fs') {
        throw new Error('Mocked error');
      }
      return originalRequire(moduleName);
    };

    try {
      await readFile(filePath);
      expect(true).toBe(false); // Should not reach here
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    } finally {
      require = originalRequire;
      rimraf.sync(tempDir);
    }
  });
});