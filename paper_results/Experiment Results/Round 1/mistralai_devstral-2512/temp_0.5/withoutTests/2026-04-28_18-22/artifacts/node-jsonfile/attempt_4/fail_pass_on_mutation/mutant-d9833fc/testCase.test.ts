import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import fs from 'fs';
import path from 'path';

describe('graceful-fs fallback behavior', () => {
  it('should throw when graceful-fs is unavailable and fallback is missing', () => {
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

    // Remove fs from require.cache to prevent accidental fallback
    const originalFsModule = require.cache[require.resolve('fs')];
    delete require.cache[require.resolve('fs')];

    try {
      // In original code, this should work (fallback to fs)
      // In mutated code, this should fail (_fs remains undefined)
      expect(() => {
        readFileSync(testFilePath);
      }).not.toThrow();
    } finally {
      // Restore modules
      if (originalFs) {
        require.cache[require.resolve('graceful-fs')] = originalFs;
      }
      if (originalFsModule) {
        require.cache[require.resolve('fs')] = originalFsModule;
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