import { image } from '../index';
import * as fs from 'fs';
import * as path from 'path';
import nock from 'nock';

describe('image downloader', () => {
  it('should resolve the destination path correctly when it is relative', async () => {
    nock('http://someurl.com')
      .get('/image-success.png')
      .replyWithFile(200, path.join(__dirname, 'fixtures/android.jpg'), {
        'Content-Type': 'image/jpeg',
      });

    const dest = './test/fixtures/image-success.png';
    const result = await image({ url: 'http://someurl.com/image-success.png', dest });
    expect(result.filename).toEqual(path.resolve(process.cwd(), dest));
    expect(() => fs.accessSync(result.filename)).not.toThrow();
  });
});