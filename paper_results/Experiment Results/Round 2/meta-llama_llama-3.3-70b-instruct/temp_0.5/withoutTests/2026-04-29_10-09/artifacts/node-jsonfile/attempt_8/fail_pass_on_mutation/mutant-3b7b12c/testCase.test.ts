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
      const result1 = await readFile(filePath, 'utf8');
      const result2 = await readFile(filePath, { encoding: 'utf8' });

      // Check if the results are the same
      expect(result1).toEqual(result2);
    } finally {
      // Remove the temporary directory
      fs.rmdirSync(tempDir, { recursive: true });
    }
  });
});