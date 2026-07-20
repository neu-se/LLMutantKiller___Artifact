import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('readFile with string encoding option', () => {
  it('should use the encoding when options is passed as a string', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
    const testFile = path.join(tmpDir, 'test.json');
    
    try {
      // Write a JSON file encoded in latin1 with a character that differs from UTF-8
      // The byte 0xe9 is 'é' in latin1 but invalid/different in UTF-8
      const jsonStr = '{"name":"caf\xe9"}'; // 'café' in latin1
      fs.writeFileSync(testFile, Buffer.from(jsonStr, 'latin1'));
      
      // Original: options = { encoding: 'latin1' } -> reads as latin1 string -> parses correctly
      // Mutated: options = {} -> reads as Buffer -> JSON.parse uses UTF-8 -> different result or error
      const result = await jsonfile.readFile(testFile, 'latin1');
      
      expect(result).toEqual({ name: 'café' });
    } finally {
      fs.rmSync(tmpDir, { recursive: true });
    }
  });
});