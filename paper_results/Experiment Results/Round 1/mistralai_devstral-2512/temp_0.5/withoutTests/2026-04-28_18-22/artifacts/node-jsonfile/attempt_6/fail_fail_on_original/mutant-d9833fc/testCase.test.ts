import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import fs from 'fs';
import path from 'path';

describe('graceful-fs fallback behavior', () => {
  it('should use fs fallback when graceful-fs is unavailable', () => {
    // Create a test file
    const testFilePath = path.join(__dirname, 'test-fallback.json');
    const testData = { key: 'value' };
    fs.writeFileSync(testFilePath, JSON.stringify(testData));

    // Force graceful-fs to fail by making it unavailable
    const originalFs = require.cache[require.resolve('graceful-fs')];
    delete require.cache[require.resolve('graceful-fs')];

    // Mock graceful-fs to throw
    jest.doMock('graceful-fs', () => {
      throw new Error('graceful-fs unavailable');
    }, { virtual: true });

    // Track if fs was used as fallback
    let fsUsed = false;
    const originalReadFileSync = fs.readFileSync;
    fs.readFileSync = function(...args) {
      fsUsed = true;
      return originalReadFileSync.apply(this, args);
    };

    try {
      // In original code, this should work and use fs fallback
      const result = readFileSync(testFilePath);
      expect(result).toEqual(testData);
      expect(fsUsed).toBe(true);
    } finally {
      // Restore
      fs.readFileSync = originalReadFileSync;
      if (originalFs) {
        require.cache[require.resolve('graceful-fs')] = originalFs;
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