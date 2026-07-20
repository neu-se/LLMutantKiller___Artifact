import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import fs from 'fs';
import path from 'path';

describe('graceful-fs fallback behavior', () => {
  it('should throw when graceful-fs fails to load and no fallback exists', () => {
    // Create a test file
    const testFilePath = path.join(__dirname, 'test-fallback.json');
    const testData = { test: true };
    fs.writeFileSync(testFilePath, JSON.stringify(testData));

    // Force graceful-fs to fail by making it unavailable
    const originalFs = require.cache[require.resolve('graceful-fs')];
    delete require.cache[require.resolve('graceful-fs')];

    // Mock graceful-fs to throw
    jest.doMock('graceful-fs', () => {
      throw new Error('graceful-fs unavailable');
    }, { virtual: true });

    // Temporarily remove fs from cache to prevent fallback
    const fsCache = require.cache[require.resolve('fs')];
    delete require.cache[require.resolve('fs')];

    try {
      // This should work in original code (fallback to fs)
      // This should fail in mutated code (_fs remains undefined)
      const result = readFileSync(testFilePath);
      expect(result).toEqual(testData);
    } finally {
      // Restore modules
      if (originalFs) {
        require.cache[require.resolve('graceful-fs')] = originalFs;
      }
      if (fsCache) {
        require.cache[require.resolve('fs')] = fsCache;
      }
      // Clean up
      try {
        fs.unlinkSync(testFilePath);
      } catch (_) {
        // Ignore cleanup errors
      }
    }
  });
});