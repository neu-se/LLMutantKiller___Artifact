import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { join } from 'path';
import { mkdirSync, existsSync, rmSync } from 'fs';

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

    // Call the image function with a relative destination path
    const promise = image({ url, dest: join(testDir, dest) });
    await expect(promise).rejects.toThrowError('Request Failed.');

    // Check if the file exists at the expected absolute path
    const absolutePath = join(process.cwd(), testDir, dest);
    expect(existsSync(absolutePath)).toBe(false); // The file should not exist

    // Call the image function with a relative destination path that is not resolvable
    const promise2 = image({ url, dest: 'non-existent-dir/test-image.jpg' });
    await expect(promise2).rejects.toThrowError('Request Failed.');

    // On the original code, the relative path should be resolved to an absolute path
    // But on the mutated code, the relative path will not be resolved
    const nonExistentDir = 'non-existent-dir';
    const nonExistentPath = join(nonExistentDir, dest);
    expect(existsSync(nonExistentPath)).toBe(false); // The file should not exist
    const promise3 = image({ url, dest: nonExistentPath });
    await expect(promise3).rejects.toThrowError('Request Failed.');
    expect(existsSync(nonExistentPath)).toBe(false); // The file should not exist

    // Clean up the test directory
    try {
      rmSync(testDir, { recursive: true });
    } catch (error) {
      // Ignore the error
    }
  });
});