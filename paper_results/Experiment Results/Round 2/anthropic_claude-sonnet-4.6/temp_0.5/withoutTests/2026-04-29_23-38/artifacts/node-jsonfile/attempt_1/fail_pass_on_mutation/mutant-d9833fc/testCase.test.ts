import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('jsonfile fallback to fs when graceful-fs unavailable', () => {
  it('should still read files correctly even when graceful-fs is not available', async () => {
    // Create a temp file with JSON content
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `test-jsonfile-${Date.now()}.json`);
    const testData = { hello: 'world', num: 42 };
    fs.writeFileSync(tmpFile, JSON.stringify(testData));

    try {
      // Mock graceful-fs to throw, simulating it being unavailable
      const originalLoad = require.resolve('graceful-fs');
      const originalModule = require.cache[originalLoad];
      
      // Remove graceful-fs from cache and make it throw
      delete require.cache[originalLoad];
      require.cache[originalLoad] = {
        id: originalLoad,
        filename: originalLoad,
        loaded: true,
        exports: null,
        parent: null,
        children: [],
        paths: [],
        get: () => { throw new Error('graceful-fs not available'); }
      } as any;

      // Also remove the jsonfile module from cache to force re-evaluation
      const jsonfilePath = require.resolve('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
      delete require.cache[jsonfilePath];

      // With original code: falls back to 'fs', works fine
      // With mutated code: _fs is undefined, throws error
      const jsonfile = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
      const result = jsonfile.readFileSync(tmpFile);
      
      expect(result).toEqual(testData);
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });
});