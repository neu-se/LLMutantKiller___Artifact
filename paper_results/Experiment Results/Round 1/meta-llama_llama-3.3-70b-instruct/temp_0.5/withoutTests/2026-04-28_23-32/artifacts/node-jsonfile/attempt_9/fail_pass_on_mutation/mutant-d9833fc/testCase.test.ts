import { readFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';
import * as fs from 'fs';
import * as path from 'path';

describe('jsonfile', () => {
  it('should use fs when graceful-fs is not available', async () => {
    // Create a temporary file
    const tempFile = path.join(__dirname, 'temp.json');
    fs.writeFileSync(tempFile, '{}');

    // Try to read the file using jsonfile with fs mocked to throw
    const originalFs = require('fs');
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
    const result = await readFile(tempFile);

    // Check if the result is not null
    expect(result).not.toBeNull();

    // Clean up
    fs.unlinkSync(tempFile);

    // Reset the mock
    jest.restoreAllMocks();

    // Try to read the file using jsonfile with fs and graceful-fs mocked to throw
    jest.spyOn(require('module'), 'createRequire').mockImplementationOnce(() => {
      const originalRequire = require('module').createRequire();
      return (modulePath: string) => {
        if (modulePath === 'graceful-fs') {
          throw new Error('Module not found');
        }
        if (modulePath === 'fs') {
          throw new Error('Module not found');
        }
        return originalRequire(modulePath);
      };
    });

    // This should fail on the mutated code
    await expect(readFile(tempFile)).rejects.toThrowError();
  });
});