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

    // Mock graceful-fs to throw during require
    const Module = require('module');
    const originalRequire = Module.prototype.require;
    Module.prototype.require = function(id: string) {
      if (id === 'graceful-fs') {
        throw new Error('Graceful-fs not available');
      }
      return originalRequire.apply(this, arguments);
    };

    try {
      // Force reload of the module
      const { readFileSync: freshReadFileSync } = require("../../../../../../../../../../../subject_repositories/node-jsonfile/index.js");

      // In original code: should fall back to fs and work
      // In mutated code: will throw because catch block is empty
      const result = freshReadFileSync(testFile);
      expect(result).toEqual(testData);
    } catch (error) {
      // If we get here in original code, the test should fail
      // If we get here in mutated code, this is expected
      if (error.message === 'Graceful-fs not available') {
        fail('graceful-fs loading failed and no fallback occurred');
      }
      throw error;
    } finally {
      // Restore original require
      Module.prototype.require = originalRequire;
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});