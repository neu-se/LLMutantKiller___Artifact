import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('jsonfile fallback to fs when graceful-fs is unavailable', () => {
  it('should read a JSON file successfully even when graceful-fs is not available', () => {
    // Create a temp file to read
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-mutation-test-' + Date.now());
    fs.mkdirSync(TEST_DIR, { recursive: true });
    const file = path.join(TEST_DIR, 'test.json');
    const obj = { name: 'test', value: 42 };
    fs.writeFileSync(file, JSON.stringify(obj));

    try {
      // Mock graceful-fs to throw, simulating it not being installed
      const Module = require('module');
      const originalLoad = Module._resolveFilename;
      Module._resolveFilename = function(request: string, ...args: any[]) {
        if (request === 'graceful-fs') {
          throw new Error('Cannot find module graceful-fs');
        }
        return originalLoad.call(this, request, ...args);
      };

      // Clear the cached module so it re-initializes
      delete require.cache[require.resolve('../index.js')];

      let jf: any;
      try {
        jf = require('../index.js');
      } finally {
        // Restore the original resolver
        Module._resolveFilename = originalLoad;
      }

      // In original code: _fs falls back to require('fs'), so this works
      // In mutated code: _fs is undefined, so this throws TypeError
      const result = jf.readFileSync(file);
      expect(result).toEqual(obj);
    } finally {
      // Restore the cached module
      delete require.cache[require.resolve('../index.js')];
      require('../index.js');
      // Cleanup
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });
});