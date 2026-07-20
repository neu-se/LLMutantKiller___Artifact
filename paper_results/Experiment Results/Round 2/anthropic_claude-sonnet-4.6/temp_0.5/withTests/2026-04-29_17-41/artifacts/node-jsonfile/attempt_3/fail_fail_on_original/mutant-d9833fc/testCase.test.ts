import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('jsonfile fallback to fs when graceful-fs is unavailable', () => {
  it('should read a JSON file using the default fs when graceful-fs throws on require', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-mutation-test-fallback-2');
    fs.mkdirSync(TEST_DIR, { recursive: true });
    const file = path.join(TEST_DIR, 'test.json');
    const obj = { name: 'mutation-test', value: 99 };
    fs.writeFileSync(file, JSON.stringify(obj));

    const indexPath = require.resolve('../../../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');

    // Remove graceful-fs from cache and replace with a throwing module
    const gracefulFsPath = require.resolve('graceful-fs');
    const originalGracefulFs = require.cache[gracefulFsPath];

    // Make graceful-fs throw when required
    require.cache[gracefulFsPath] = {
      id: gracefulFsPath,
      filename: gracefulFsPath,
      loaded: true,
      exports: {},
      paths: [],
      children: [],
      parent: null,
    } as any;

    // Temporarily replace the graceful-fs exports with a getter that throws
    const fakeModule = require.cache[gracefulFsPath]!;
    // Override by deleting and setting a module that throws
    delete require.cache[gracefulFsPath];

    // Use a proxy in the require cache that simulates graceful-fs not being installed
    const originalRequire = Module.prototype.require;

    const Module = require('module');
    const origLoad = Module._load;
    Module._load = function(request: string, ...args: any[]) {
      if (request === 'graceful-fs') {
        throw new Error('Cannot find module graceful-fs');
      }
      return origLoad.call(this, request, ...args);
    };

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
      if (originalGracefulFs) {
        require.cache[gracefulFsPath] = originalGracefulFs;
      }
      delete require.cache[indexPath];
      try { fs.rmSync(TEST_DIR, { recursive: true, force: true }); } catch {}
    }

    // Original code: catch block sets _fs = require('fs'), so readFileSync works
    // Mutated code: catch block is empty, _fs is undefined, readFileSync throws TypeError
    expect(caughtError).toBeNull();
    expect(result).toEqual(obj);
  });
});