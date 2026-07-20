import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import jf = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');

describe('readFile async with string encoding option', () => {
  it('should correctly decode and parse JSON when encoding string is passed as option', async () => {
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-mutant-3b7b12c');
    fs.mkdirSync(TEST_DIR, { recursive: true });

    try {
      const file = path.join(TEST_DIR, 'test.json');
      const obj = { name: 'JP' };
      // Write file in utf16le encoding - requires explicit encoding to read correctly
      // Without encoding, fs.readFile returns a Buffer with null bytes between each char,
      // causing JSON.parse to fail
      fs.writeFileSync(file, JSON.stringify(obj), 'utf16le');

      // Original: options becomes { encoding: 'utf16le' } -> fs.readFile returns decoded string -> JSON.parse succeeds
      // Mutated: options becomes {} -> fs.readFile returns raw Buffer with null bytes -> JSON.parse throws
      const data = await jf.readFile(file, 'utf16le');
      expect(data).toEqual(obj);
      expect(data.name).toBe('JP');
    } finally {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });
});