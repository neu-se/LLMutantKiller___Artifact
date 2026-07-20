import { nock } from 'nock';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { Something } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js";

describe('request', () => {
  it('should reject with a meaningful error message when the status code is not 200', async () => {
    const url = 'http://example.com';
    const dest = join(__dirname, 'test.txt');

    nock(url)
      .get('/')
      .reply(404, 'Not Found');

    await expect(Something({ url, dest })).rejects.toThrowError(
      expect.objectContaining({
        message: expect.stringContaining('Status Code: 404'),
      }),
    );

    // Clean up
    const fs = require('fs');
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
    }
  });
});