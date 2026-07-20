import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';

describe('image downloader', () => {
  it('should resolve relative destination path to absolute path', async () => {
    const dest = 'test-image.jpg';
    const url = 'https://example.com/image.jpg';

    // Create a directory to test relative path resolution
    const testDir = 'test-dir';
    try {
      mkdirSync(testDir);
    } catch (error) {
      // If the directory already exists, continue with the test
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }

    try {
      // Call the image function with a relative destination path
      const promise = image({ url, dest: join(testDir, dest) });
      await expect(promise).resolves.not.toThrow();

      // Check if the file exists at the expected absolute path
      const absolutePath = join(process.cwd(), testDir, dest);
      expect(existsSync(absolutePath)).toBe(false); // The file should not exist yet

      // Call the image function again with the same relative destination path
      const promise2 = image({ url, dest: join(testDir, dest) });
      await expect(promise2).rejects.toThrowError('EEXIST'); // The file should already exist
    } finally {
      // Clean up the test directory
      const fs = require('fs');
      fs.rmdirSync(testDir, { recursive: true });
    }
  });
});