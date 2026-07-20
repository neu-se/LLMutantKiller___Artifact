import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('graceful-fs fallback behavior', () => {
  it('should handle missing graceful-fs module by falling back to fs', () => {
    // Create test directory and file
    const testDir = join(tmpdir(), 'jsonfile-test-graceful-fallback');
    rmSync(testDir, { recursive: true, force: true });
    mkdirSync(testDir, { recursive: true });
    const testFile = join(testDir, 'test.json');
    const testData = { name: 'test' };
    writeFileSync(testFile, JSON.stringify(testData));

    // Temporarily modify require cache to simulate missing graceful-fs
    const Module = require('module');
    const originalRequire = Module.prototype.require;

    let gracefulFsRequired = false;
    Module.prototype.require = function(id) {
      if (id === 'graceful-fs') {
        gracefulFsRequired = true;
        throw new Error('Cannot find module graceful-fs');
      }
      return originalRequire.apply(this, arguments);
    };

    // Force reloading of the module to trigger the fallback
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/node-jsonfile/index.js")];
    const { readFileSync: freshReadFileSync } = require("../../../../../../../../../../../subject_repositories/node-jsonfile/index.js");

    // In original code: should fall back to fs and work
    // In mutated code: will throw because catch block is empty
    expect(() => {
      const result = freshReadFileSync(testFile);
      expect(result).toEqual(testData);
    }).not.toThrow();

    // Restore original require
    Module.prototype.require = originalRequire;

    // Clean up
    rmSync(testDir, { recursive: true, force: true });
  });
});