import { readFile, writeFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';
import * as fs from 'fs';
import * as path from 'path';

describe('jsonfile', () => {
  it('should handle encoding option correctly', async () => {
    const tempDir = 'temp-dir';
    const filePath = path.join(tempDir, 'test.json');
    const data = { foo: 'bar' };

    // Create a temporary directory
    fs.mkdirSync(tempDir);

    try {
      // Write data to file with encoding option
      await writeFile(filePath, data, 'utf8');

      // Read file with encoding option
      const result = await readFile(filePath, 'utf8');

      // Check if the result is correct
      expect(result).toEqual(data);
    } finally {
      // Remove the temporary directory
      fs.rmdirSync(tempDir, { recursive: true });
    }
  });
});