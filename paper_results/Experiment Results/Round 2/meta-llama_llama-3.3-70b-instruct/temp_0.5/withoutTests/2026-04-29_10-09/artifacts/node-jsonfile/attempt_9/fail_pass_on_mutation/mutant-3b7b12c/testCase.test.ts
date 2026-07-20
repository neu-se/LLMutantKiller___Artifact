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
      const options = 'utf8';
      const result = await readFile(filePath, options);

      // Check if the result is a string when options is a string
      expect(typeof result).toBe('object');

      // Check if the result has the correct properties
      expect(result).toHaveProperty('foo');
      expect(result.foo).toBe('bar');

      // Check if the encoding was applied correctly
      const buffer = fs.readFileSync(filePath);
      const string = buffer.toString();
      expect(string).toBe(JSON.stringify(data));
    } finally {
      // Remove the temporary directory
      fs.rmdirSync(tempDir, { recursive: true });
    }
  });
});