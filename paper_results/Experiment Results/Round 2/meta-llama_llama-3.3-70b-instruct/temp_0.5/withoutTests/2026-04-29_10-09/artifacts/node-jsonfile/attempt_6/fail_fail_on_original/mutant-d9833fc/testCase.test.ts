import { readFile } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from 'fs';
import * as path from 'path';

describe('jsonfile', () => {
  it('should use fs module as a fallback when graceful-fs fails', async () => {
    const tempDir = 'temp-test-dir';
    fs.mkdirSync(tempDir);
    const filePath = path.join(tempDir, 'test.json');
    fs.writeFileSync(filePath, '{}');

    // Mock the require function to make it throw an error when requiring 'graceful-fs'
    const originalRequire = require;
    const originalFs = fs;
    let fsMocked = false;
    const originalFsRequire = originalRequire('fs');
    require = (moduleName: string) => {
      if (moduleName === 'graceful-fs') {
        throw new Error('Mocked error');
      } else if (moduleName === 'fs') {
        fsMocked = true;
        return originalFsRequire;
      }
      return originalRequire(moduleName);
    };

    try {
      await readFile(filePath);
      expect(fsMocked).toBe(true); // If fs is used as a fallback, this should be true
    } catch (error) {
      expect(true).toBe(false); // Should not reach here
    } finally {
      require = originalRequire;
      fs.rmdirSync(tempDir, { recursive: true });
    }
  });
});