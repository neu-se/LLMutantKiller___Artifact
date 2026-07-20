import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import fs from 'fs';
import path from 'path';

describe('readFileSync graceful-fs fallback', () => {
  it('should use fs when graceful-fs fails to load', () => {
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

    try {
      // This should still work because original code falls back to fs
      const result = readFileSync(testFilePath);
      expect(result).toEqual(testData);
    } finally {
      // Restore graceful-fs
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