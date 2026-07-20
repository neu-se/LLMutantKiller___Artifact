import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

describe('image downloader', () => {
  it('should resolve relative destination path to absolute path', async () => {
    const dest = 'test-image.jpg';
    const url = 'https://example.com/image.jpg';

    // Create a directory to test relative path resolution
    const testDir = 'test-dir';
    mkdirSync(testDir);

    try {
      // Call the image function with a relative destination path
      const promise = image({ url, dest: join(testDir, dest) });
      await expect(promise).resolves.not.toThrow();

      // Check if the file exists at the expected absolute path
      const absolutePath = join(process.cwd(), testDir, dest);
      expect(existsSync(absolutePath)).toBe(true);
    } finally {
      // Clean up the test directory
      const fs = require('fs');
      fs.rmdirSync(testDir, { recursive: true });
    }
  });
});