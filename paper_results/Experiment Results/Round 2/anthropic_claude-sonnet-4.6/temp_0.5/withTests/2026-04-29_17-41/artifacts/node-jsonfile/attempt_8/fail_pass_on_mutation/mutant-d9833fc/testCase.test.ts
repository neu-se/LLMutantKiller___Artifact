import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('jsonfile fallback to fs when graceful-fs is unavailable', () => {
  it('should successfully read a JSON file when graceful-fs is unavailable by falling back to fs', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-mutation-test-fallback');
    fs.mkdirSync(TEST_DIR, { recursive: true });
    const file = path.join(TEST_DIR, 'test.json');
    const obj = { name: 'mutation-test', value: 99 };
    fs.writeFileSync(file, JSON.stringify(obj));

    // Use jest.isolateModules to load index fresh with graceful-fs mocked to throw
    let jf: any;
    jest.isolateModules(() => {
      // Override require inside isolated context
      const Module = require('module');
      const origLoad = Module._load;
      Module._load = function (request: string, parent: any, isMain: boolean) {
        if (request === 'graceful-fs') {
          const e = new Error("Cannot find module 'graceful-fs'") as any;
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        }
        return origLoad.call(this, request, parent, isMain);
      };
      try {
        jf = require('../../../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
      } finally {
        Module._load = origLoad;
      }
    });

    let result: any = null;
    let caughtError: Error | null = null;
    try {
      result = jf.readFileSync(file);
    } catch (err) {
      caughtError = err as Error;
    } finally {
      try { fs.rmSync(TEST_DIR, { recursive: true, force: true }); } catch {}
    }

    // Original: catch block sets _fs = require('fs'), readFileSync works fine
    // Mutated: catch block is empty, _fs is undefined, readFileSync throws TypeError
    expect(caughtError).toBeNull();
    expect(result).toEqual(obj);
  });
});