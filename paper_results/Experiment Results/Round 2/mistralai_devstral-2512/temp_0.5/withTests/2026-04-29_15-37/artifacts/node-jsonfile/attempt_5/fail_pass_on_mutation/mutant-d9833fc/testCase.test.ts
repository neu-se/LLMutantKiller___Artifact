import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('graceful-fs module loading', () => {
  it('should properly handle graceful-fs loading failure', () => {
    // Create test directory and file
    const testDir = join(tmpdir(), 'jsonfile-test-graceful-loading');
    rmSync(testDir, { recursive: true, force: true });
    mkdirSync(testDir, { recursive: true });
    const testFile = join(testDir, 'test.json');
    const testData = { name: 'test' };
    writeFileSync(testFile, JSON.stringify(testData));

    // Clear the module cache to force fresh loading
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/node-jsonfile/index.js");
    delete require.cache[modulePath];

    // Mock graceful-fs to throw during require
    const Module = require('module');
    const originalRequire = Module.prototype.require;
    Module.prototype.require = function(id) {
      if (id === 'graceful-fs') {
        throw new Error('Graceful-fs not available');
      }
      return originalRequire.apply(this, arguments);
    };

    // This will trigger the try-catch block in index.js
    try {
      const { readFileSync: freshReadFileSync } = require("../../../../../../../../../../../subject_repositories/node-jsonfile/index.js");

      // In original code: should fall back to fs and work
      // In mutated code: will fail because catch block is empty
      const result = freshReadFileSync(testFile);
      expect(result).toEqual(testData);
    } finally {
      // Restore original require
      Module.prototype.require = originalRequire;
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});