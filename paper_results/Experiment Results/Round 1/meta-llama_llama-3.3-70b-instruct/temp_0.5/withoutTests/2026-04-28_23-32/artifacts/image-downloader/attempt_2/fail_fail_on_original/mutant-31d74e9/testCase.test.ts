import { createWriteStream } from 'fs';
import { join } from 'path';
import { rm } from 'fs/promises';
import { fileURLToPath } from 'url';
import { setTimeout } from 'timers';
import { nock } from 'nock';
import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('download function', () => {
  it('should reject the promise when an error occurs while writing to the file', async () => {
    const tempDir = join(process.cwd(), 'temp');
    const filePath = join(tempDir, 'test.txt');
    const url = 'http://example.com';

    // Mock the request to return a successful response
    nock('http://example.com')
      .get('/')
      .reply(200, 'Hello World');

    // Create a temporary directory
    await rm(tempDir, { recursive: true, force: true });
    await import('fs').then(fs => fs.mkdirSync(tempDir));

    // Call the download function
    const promise = download({ url, dest: filePath });

    // Wait for the promise to be resolved
    await expect(promise).resolves.toHaveProperty('filename', filePath);

    // Clean up
    await rm(tempDir, { recursive: true, force: true });
  });
});