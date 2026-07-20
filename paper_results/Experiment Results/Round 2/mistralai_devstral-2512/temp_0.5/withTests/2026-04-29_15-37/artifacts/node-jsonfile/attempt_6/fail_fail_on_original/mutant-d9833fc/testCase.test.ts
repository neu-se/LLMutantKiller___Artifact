import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { mkdirSync, rmSync, writeFileSync, existsSync } from 'fs';
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

    // Check if graceful-fs is actually available
    const gracefulFsAvailable = existsSync(join(process.cwd(), 'node_modules', 'graceful-fs'));

    // Clear module cache to force fresh loading
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/node-jsonfile/index.js");
    delete require.cache[modulePath];

    // Temporarily make graceful-fs unavailable by mocking require
    const Module = require('module');
    const originalRequire = Module.prototype.require;
    let requireCalled = false;

    Module.prototype.require = function(id) {
      if (id === 'graceful-fs') {
        requireCalled = true;
        throw new Error('Graceful-fs not available');
      }
      return originalRequire.apply(this, arguments);
    };

    try {
      // Force reload of the module
      const { readFileSync: freshReadFileSync } = require("../../../../../../../../../../../subject_repositories/node-jsonfile/index.js");

      // This should work in original code (falls back to fs)
      // but fail in mutated code (no fallback)
      const result = freshReadFileSync(testFile);
      expect(result).toEqual(testData);
      expect(requireCalled).toBe(true);
    } finally {
      Module.prototype.require = originalRequire;
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});