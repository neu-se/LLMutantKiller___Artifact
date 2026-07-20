import { readFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';
import * as fs from 'fs';
import * as path from 'path';

describe('jsonfile', () => {
  it('should use fs when graceful-fs is not available', async () => {
    // Create a temporary file
    const tempFile = path.join(__dirname, 'temp.json');
    fs.writeFileSync(tempFile, '{}');

    // Mock the require function to return an error for 'graceful-fs'
    jest.spyOn(require('module'), 'createRequire').mockImplementationOnce(() => {
      const originalRequire = require('module').createRequire();
      return (modulePath: string) => {
        if (modulePath === 'graceful-fs') {
          throw new Error('Module not found');
        }
        return originalRequire(modulePath);
      };
    });

    // Try to read the file using jsonfile
    await expect(readFile(tempFile)).resolves.not.toBeNull();

    // Clean up
    fs.unlinkSync(tempFile);
  });
});