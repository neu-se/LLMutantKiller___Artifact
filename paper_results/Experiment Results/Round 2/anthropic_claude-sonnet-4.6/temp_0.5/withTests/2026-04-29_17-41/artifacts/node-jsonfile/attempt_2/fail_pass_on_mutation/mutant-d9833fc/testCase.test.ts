import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('jsonfile fallback to fs when graceful-fs is unavailable', () => {
  it('should read a JSON file successfully even when graceful-fs is not available', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-mutation-test-fallback');
    fs.mkdirSync(TEST_DIR, { recursive: true });
    const file = path.join(TEST_DIR, 'test.json');
    const obj = { name: 'test', value: 42 };
    fs.writeFileSync(file, JSON.stringify(obj));

    // Resolve the actual index module path
    const indexPath = require.resolve('../../../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');

    const Module = require('module');
    const originalLoad = Module._resolveFilename;

    // Make graceful-fs appear unavailable
    Module._resolveFilename = function(request: string, ...args: any[]) {
      if (request === 'graceful-fs') {
        throw new Error('Cannot find module graceful-fs');
      }
      return originalLoad.call(this, request, ...args);
    };

    // Clear the cached module so it re-initializes
    delete require.cache[indexPath];

    let jf: any;
    let readError: Error | null = null;
    try {
      jf = require(indexPath);
      const result = jf.readFileSync(file);
      expect(result).toEqual(obj);
    } catch (err) {
      readError = err as Error;
    } finally {
      Module._resolveFilename = originalLoad;
      delete require.cache[indexPath];
      try { fs.rmSync(TEST_DIR, { recursive: true, force: true }); } catch {}
    }

    // In original: works fine (falls back to fs)
    // In mutated: _fs is undefined, throws TypeError
    expect(readError).toBeNull();
  });
});