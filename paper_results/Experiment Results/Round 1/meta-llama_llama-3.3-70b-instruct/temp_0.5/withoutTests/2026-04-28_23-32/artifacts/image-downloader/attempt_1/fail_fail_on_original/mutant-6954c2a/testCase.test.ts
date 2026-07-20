import { nock } from 'nock';
import { join } from 'path';
import { tmpdir } from 'os';
import { createWriteStream, unlinkSync } from 'fs';
import { promisify } from 'util';
import { TimeoutError } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/TimeoutError';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

const unlink = promisify(unlinkSync);

describe('request', () => {
  it('should reject with a meaningful error message when the status code is not 200', async () => {
    const url = 'http://example.com';
    const dest = join(tmpdir(), 'test.txt');
    const writeStream = createWriteStream(dest);
    writeStream.end();
    await new Promise(resolve => writeStream.on('close', resolve));
    nock('http://example.com')
      .get('/')
      .reply(404);
    await expect(request({ url, dest })).rejects.toThrowError('Request Failed.\nStatus Code: 404');
    await unlink(dest);
  });
});