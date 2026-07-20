import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index';
import * as fs from 'fs';
import * as path from 'path';
import nock from 'nock';

describe('image downloader', () => {
  it('should resolve relative destination path', async () => {
    nock('http://someurl.com')
      .get('/image.jpg')
      .replyWithFile(200, path.join(__dirname, '../fixtures/android.jpg'), {
        'Content-Type': 'image/jpeg',
      });

    const dest = './tmp/image.jpg';
    await expect(image({ url: 'http://someurl.com/image.jpg', dest: './tmp' })).rejects.toThrow();
  });
});