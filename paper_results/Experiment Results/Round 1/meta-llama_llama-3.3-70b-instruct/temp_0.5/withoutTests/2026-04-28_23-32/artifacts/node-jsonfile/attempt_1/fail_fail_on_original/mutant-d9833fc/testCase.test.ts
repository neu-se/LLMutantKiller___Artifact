import { readFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

describe('jsonfile', () => {
  it('should throw an error when fs is not available', async () => {
    // Create a temporary file
    const tempFile = path.join(__dirname, 'temp.json');
    await promisify(fs.writeFile)(tempFile, '{}');

    // Delete the fs module to simulate it being unavailable
    jest.spyOn(require('module'), 'createRequire').mockImplementationOnce(() => {
      const originalRequire = require('module').createRequire();
      return (modulePath: string) => {
        if (modulePath === 'fs') {
          throw new Error('Module not found');
        }
        return originalRequire(modulePath);
      };
    });

    // Try to read the file using jsonfile
    await expect(readFile(tempFile)).rejects.toThrowError('Module not found');

    // Clean up
    await promisify(fs.unlink)(tempFile);
  });
});