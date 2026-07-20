import { image } from '../../../index';
import * as fs from 'fs';
import * as path from 'path';
import nock from 'nock';

describe('image downloader', () => {
  it('should resolve relative destination path', async () => {
    nock('http://someurl.com')
      .get('/image.jpg')
      .replyWithFile(200, path.join(__dirname, 'fixtures/android.jpg'), {
        'Content-Type': 'image/jpeg',
      });

    const dest = './image.jpg';
    await image({ url: 'http://someurl.com/image.jpg', dest });
    expect(() => fs.accessSync(path.resolve(__dirname, dest))).not.toThrow();
  });
});