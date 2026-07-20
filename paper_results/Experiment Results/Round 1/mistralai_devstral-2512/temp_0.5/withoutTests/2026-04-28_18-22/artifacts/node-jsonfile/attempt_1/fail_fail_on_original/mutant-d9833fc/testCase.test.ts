import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import fs from 'fs';
import path from 'path';

describe('readFileSync with graceful-fs fallback', () => {
  it('should fallback to fs when graceful-fs is not available', () => {
    // Create a test file
    const testFilePath = path.join(__dirname, 'test.json');
    const testData = { test: 'data' };
    fs.writeFileSync(testFilePath, JSON.stringify(testData));

    // Mock graceful-fs to throw an error to force fallback to fs
    const originalFs = require.cache[require.resolve('graceful-fs')];
    delete require.cache[require.resolve('graceful-fs')];

    let gracefulFsThrew = false;
    jest.doMock('graceful-fs', () => {
      gracefulFsThrew = true;
      throw new Error('graceful-fs not available');
    }, { virtual: true });

    try {
      const result = readFileSync(testFilePath);
      expect(result).toEqual(testData);
      expect(gracefulFsThrew).toBe(true);
    } finally {
      // Restore graceful-fs
      if (originalFs) {
        require.cache[require.resolve('graceful-fs')] = originalFs;
      }
      // Clean up test file
      try {
        fs.unlinkSync(testFilePath);
      } catch (_) {
        // Ignore cleanup errors
      }
    }
  });
});