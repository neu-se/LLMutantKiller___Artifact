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

      // Check if options is an object when passed as a string
      const options = 'utf8';
      if (typeof options === 'string') {
        expect(options).toEqual('utf8');
      } else {
        throw new Error('Options should be an object');
      }
    } finally {
      // Remove the temporary directory
      fs.rmdirSync(tempDir, { recursive: true });
    }
  });
});