import { readFile } from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';
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
      // Write data to file
      fs.writeFileSync(filePath, JSON.stringify(data));

      // Read file with encoding option as a string
      const result = await readFile(filePath, 'utf8');

      // Check if the result is correct
      expect(result).toEqual(data);

      // Read file with encoding option as a string again
      const result2 = await readFile(filePath, 'utf8');

      // Check if the result is correct
      expect(result2).toEqual(data);

      // Read file with encoding option as a string, but this time, pass 'utf8' as a string instead of an options object
      const result3 = await readFile(filePath, 'utf8');

      // Check if the result is correct
      expect(result3).toEqual(data);
    } finally {
      // Remove the temporary directory
      fs.rmdirSync(tempDir, { recursive: true });
    }
  });
});