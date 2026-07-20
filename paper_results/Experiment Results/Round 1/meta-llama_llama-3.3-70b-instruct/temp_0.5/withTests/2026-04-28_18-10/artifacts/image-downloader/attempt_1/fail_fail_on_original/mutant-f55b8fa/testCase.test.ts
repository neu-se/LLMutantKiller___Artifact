import { image } from '../../../index.js';
import fs from 'fs';
import path from 'path';
import nock from 'nock';

describe('download an image', () => {
  it('should resolve the destination path when it is relative and not absolute', () => {
    const dest = './test-image.jpg';
    const url = 'http://someurl.com/image-success.png';
    nock('http://someurl.com')
      .get(/success/)
      .replyWithFile(200, path.join(__dirname, 'fixtures/android.jpg'), {
        'Content-Type': 'image/jpeg',
      });

    return image({ url, dest })
      .then(({ filename }) => {
        expect(filename).toEqual(path.resolve(process.cwd(), dest));
        expect(() => fs.accessSync(filename)).not.toThrow();
      });
  });
});