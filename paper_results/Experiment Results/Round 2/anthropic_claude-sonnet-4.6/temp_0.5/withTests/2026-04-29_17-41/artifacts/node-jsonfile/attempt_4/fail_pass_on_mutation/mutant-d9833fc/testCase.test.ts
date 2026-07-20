import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('jsonfile fallback to fs when graceful-fs is unavailable', () => {
  it('should read a JSON file using the default fs when graceful-fs throws on require', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-mutation-test-fallback');
    fs.mkdirSync(TEST_DIR, { recursive: true });
    const file = path.join(TEST_DIR, 'test.json');
    const obj = { name: 'mutation-test', value: 99 };
    fs.writeFileSync(file, JSON.stringify(obj));

    const Module = require('module');
    const indexPath = require.resolve('../../../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
    const gracefulFsPath = require.resolve('graceful-fs');

    // Intercept Module._load to make graceful-fs throw
    const origLoad = Module._load;
    Module._load = function(request: string, parent: any, isMain: boolean) {
      if (request === 'graceful-fs') {
        throw new Error('Cannot find module graceful-fs');
      }
      return origLoad.call(this, request, parent, isMain);
    };

    // Remove index from cache so it re-runs the top-level require
    delete require.cache[indexPath];

    let result: any = null;
    let caughtError: Error | null = null;
    try {
      const jf = require(indexPath);
      result = jf.readFileSync(file);
    } catch (err) {
      caughtError = err as Error;
    } finally {
      Module._load = origLoad;
      // Restore graceful-fs in cache
      if (!require.cache[gracefulFsPath]) {
        require(gracefulFsPath);
      }
      delete require.cache[indexPath];
      try { fs.rmSync(TEST_DIR, { recursive: true, force: true }); } catch {}
    }

    // Original: catch block sets _fs = require('fs'), readFileSync works fine
    // Mutated: catch block is empty, _fs is undefined, readFileSync throws TypeError
    expect(caughtError).toBeNull();
    expect(result).toEqual(obj);
  });
});