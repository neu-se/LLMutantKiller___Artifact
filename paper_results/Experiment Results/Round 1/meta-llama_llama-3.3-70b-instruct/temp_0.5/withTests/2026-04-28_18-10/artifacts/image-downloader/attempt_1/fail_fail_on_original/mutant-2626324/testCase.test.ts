import { download } from '../index';
import * as fs from 'fs';
import * as path from 'path';
import nock from 'nock';

describe('image-downloader', () => {
  it('should resolve the destination path when it is relative', async () => {
    const url = 'http://someurl.com/image-success.png';
    const dest = './test/fixtures/image-success.png';
    nock('http://someurl.com')
      .get(/success/)
      .replyWithFile(200, path.join(__dirname, 'fixtures/android.jpg'), {
        'Content-Type': 'image/jpeg',
      });

    const result = await download.image({ url, dest });
    const resolvedDest = path.resolve(__dirname, dest);
    expect(result.filename).toBe(resolvedDest);
    expect(() => fs.accessSync(resolvedDest)).not.toThrow();
    fs.unlinkSync(resolvedDest);
  });
});