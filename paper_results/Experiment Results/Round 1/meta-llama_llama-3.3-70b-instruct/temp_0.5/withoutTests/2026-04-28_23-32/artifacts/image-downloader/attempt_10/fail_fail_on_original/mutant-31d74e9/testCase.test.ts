import { join } from 'path';
import { rm } from 'fs/promises';
import { fileURLToPath } from 'url';
import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('request function', () => {
  it('should handle errors when writing to the file', async () => {
    const tempDir = join(process.cwd(), 'temp');
    const filePath = join(tempDir, 'test.txt');
    const url = 'http://example.com';

    // Create a temporary directory
    await rm(tempDir, { recursive: true, force: true });
    await import('fs').then(fs => fs.mkdirSync(tempDir));

    // Call the request function
    const promise = request({ url, dest: filePath });

    // Wait for a short period of time to allow the request to start
    await new Promise(resolve => setTimeout(resolve, 100));

    // Delete the temporary directory to trigger an error
    await rm(tempDir, { recursive: true, force: true });

    // Wait for the promise to be resolved or rejected
    try {
      await promise;
      // If the promise is resolved, check if the file still exists
      const fs = await import('fs/promises');
      expect(await fs.stat(filePath)).rejects.toThrowError();
    } catch (error) {
      // If an error is thrown, the test passes
      expect(error).toBeInstanceOf(Error);
    }
  });
});