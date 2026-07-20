import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('graceful-fs fallback mechanism', () => {
  it('should handle graceful-fs loading failure by falling back to standard fs', () => {
    // Create test directory and file
    const testDir = join(tmpdir(), 'jsonfile-test-fallback');
    rmSync(testDir, { recursive: true, force: true });
    mkdirSync(testDir, { recursive: true });
    const testFile = join(testDir, 'test.json');
    const testData = { name: 'test' };
    writeFileSync(testFile, JSON.stringify(testData));

    // Clear module cache to force fresh loading
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/node-jsonfile/index.js");
    delete require.cache[modulePath];

    // Temporarily make graceful-fs unavailable
    const originalRequire = require;
    let gracefulFsCalled = false;

    // Override require to intercept graceful-fs
    require = function(id: string) {
      if (id === 'graceful-fs') {
        gracefulFsCalled = true;
        throw new Error('Graceful-fs not available');
      }
      return originalRequire(id);
    };

    try {
      // Force reload of the module
      const { readFileSync: freshReadFileSync } = require("../../../../../../../../../../../subject_repositories/node-jsonfile/index.js");

      // Verify graceful-fs was attempted
      expect(gracefulFsCalled).toBe(true);

      // In original code: should fall back to fs and work
      // In mutated code: will throw because catch block is empty
      const result = freshReadFileSync(testFile);
      expect(result).toEqual(testData);
    } finally {
      // Restore original require
      require = originalRequire;
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});