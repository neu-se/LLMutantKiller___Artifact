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

    const indexPath = require.resolve('../../../../../../../../../../../../../subject_repositories/node-jsonfile/index.js');
    const gracefulFsPath = require.resolve('graceful-fs');

    // Save originals
    const originalGracefulFsCache = require.cache[gracefulFsPath];
    const originalIndexCache = require.cache[indexPath];

    // Remove index from cache
    delete require.cache[indexPath];

    // Replace graceful-fs in cache with a broken module that throws on property access
    // This simulates graceful-fs not being installed - the require itself won't throw
    // but we need the require('graceful-fs') call inside index.js to throw
    // We do this by deleting graceful-fs from cache AND making a fake entry that throws
    delete require.cache[gracefulFsPath];

    // Create a fake module entry whose exports getter throws
    const fakeEntry = {
      id: gracefulFsPath,
      filename: gracefulFsPath,
      loaded: false,
      exports: {},
      paths: [],
      children: [],
      parent: null,
    } as any;
    // Override the loaded property to make require fail by marking it as not a valid module
    // Instead, use a Proxy to throw when accessed
    Object.defineProperty(fakeEntry, 'exports', {
      get() { throw new Error('Cannot find module graceful-fs'); },
      configurable: true,
    });
    require.cache[gracefulFsPath] = fakeEntry;

    let result: any = null;
    let caughtError: Error | null = null;
    try {
      const jf = require(indexPath);
      result = jf.readFileSync(file);
    } catch (err) {
      caughtError = err as Error;
    } finally {
      // Restore caches
      if (originalGracefulFsCache) {
        require.cache[gracefulFsPath] = originalGracefulFsCache;
      } else {
        delete require.cache[gracefulFsPath];
      }
      if (originalIndexCache) {
        require.cache[indexPath] = originalIndexCache;
      } else {
        delete require.cache[indexPath];
      }
      try { fs.rmSync(TEST_DIR, { recursive: true, force: true }); } catch {}
    }

    // Original: catch block sets _fs = require('fs'), readFileSync works fine
    // Mutated: catch block is empty, _fs is undefined, readFileSync throws TypeError
    expect(caughtError).toBeNull();
    expect(result).toEqual(obj);
  });
});