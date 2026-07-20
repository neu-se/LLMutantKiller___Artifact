import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js';

describe('readFile with string encoding option', () => {
  it('should correctly read a JSON file when encoding is passed as a string option', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'));
    const testFile = path.join(tmpDir, 'test.json');
    
    try {
      // Write a JSON file with UTF-8 BOM to expose encoding handling difference
      const jsonContent = { name: 'test', value: 42 };
      // Write with BOM prefix to make encoding handling critical
      const bom = Buffer.from([0xEF, 0xBB, 0xBF]);
      const jsonStr = JSON.stringify(jsonContent);
      fs.writeFileSync(testFile, Buffer.concat([bom, Buffer.from(jsonStr, 'utf8')]));
      
      // When encoding is 'utf8' (string option), original code preserves encoding
      // Mutated code loses encoding, returning a Buffer instead of string
      // stripBom handles strings differently than Buffers
      const result = await jsonfile.readFile(testFile, 'utf8');
      
      expect(result).toEqual(jsonContent);
      expect(result.name).toBe('test');
      expect(result.value).toBe(42);
    } finally {
      fs.rmSync(tmpDir, { recursive: true });
    }
  });
});