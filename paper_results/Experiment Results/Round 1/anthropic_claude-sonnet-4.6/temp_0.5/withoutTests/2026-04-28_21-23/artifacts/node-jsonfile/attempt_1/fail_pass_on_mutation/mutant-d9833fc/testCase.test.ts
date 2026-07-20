import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('jsonfile fallback to fs when graceful-fs unavailable', () => {
  it('should still read files correctly when graceful-fs is not available', async () => {
    // Create a temp file with JSON content
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `test-jsonfile-${Date.now()}.json`);
    const testData = { hello: 'world', num: 42 };
    fs.writeFileSync(tmpFile, JSON.stringify(testData));

    try {
      // Mock graceful-fs to throw so the catch block is triggered
      jest.mock('graceful-fs', () => { throw new Error('graceful-fs not available'); });
      
      // Clear the module cache so it re-requires with our mock
      jest.resetModules();
      
      // Re-require the module - in original, _fs falls back to 'fs'; in mutated, _fs is undefined
      const jsonfile = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
      
      // This should work in original (uses fs fallback) but fail in mutated (_fs is undefined)
      const result = await jsonfile.readFile(tmpFile);
      expect(result).toEqual(testData);
    } finally {
      fs.unlinkSync(tmpFile);
      jest.resetModules();
      jest.unmock('graceful-fs');
    }
  });
});