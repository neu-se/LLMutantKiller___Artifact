import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('graceful-fs fallback mechanism', () => {
  it('should demonstrate the fallback behavior when graceful-fs is unavailable', () => {
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
    let gracefulFsAttempted = false;

    Module.prototype.require = function(id: string) {
      if (id === 'graceful-fs') {
        gracefulFsAttempted = true;
        throw new Error('Graceful-fs not available');
      }
      return originalRequire.apply(this, arguments);
    };

    try {
      // Force reload of the module
      const { readFileSync: freshReadFileSync } = require("../../../../../../../../../../../subject_repositories/node-jsonfile/index.js");

      // In original code: should fall back to fs and work
      // In mutated code: will throw because catch block is empty
      expect(() => {
        const result = freshReadFileSync(testFile);
        expect(result).toEqual(testData);
      }).not.toThrow();
    } finally {
      // Restore original require
      Module.prototype.require = originalRequire;
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});