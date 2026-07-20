import { createWriteStream } from 'fs';
import { join } from 'path';
import { rm } from 'fs/promises';
import { fileURLToPath } from 'url';
import { setTimeout } from 'timers';
import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('download function', () => {
  it('should reject the promise when an error occurs while writing to the file', async () => {
    const tempDir = join(process.cwd(), 'temp');
    const filePath = join(tempDir, 'test.txt');
    const url = 'http://example.com';

    // Create a temporary directory
    await rm(tempDir, { recursive: true, force: true });
    await import('fs').promises.mkdir(tempDir);

    // Mock the request to return a successful response
    const nock = require('nock');
    nock('http://example.com')
      .get('/')
      .reply(200, 'Hello World');

    // Call the download function
    const promise = download({ url, dest: filePath });

    // Wait for the download to start
    await new Promise(resolve => setTimeout(resolve, 100));

    // Simulate an error by deleting the temporary directory
    await rm(tempDir, { recursive: true, force: true });

    // Wait for the promise to be rejected
    await expect(promise).rejects.toThrowError();
  });
});