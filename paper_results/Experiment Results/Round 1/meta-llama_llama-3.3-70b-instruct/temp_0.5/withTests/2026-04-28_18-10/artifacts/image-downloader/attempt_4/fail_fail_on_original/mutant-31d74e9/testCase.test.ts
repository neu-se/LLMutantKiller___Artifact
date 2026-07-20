import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/index';
import nock from 'nock';
import fs from 'fs';
import path from 'path';

describe('download an image', () => {
  it('should pass with a successful download', (done) => {
    nock('http://someurl.com')
      .get('/image.jpg')
      .reply(200, 'image data', {
        'Content-Type': 'image/jpeg',
      });

    const options = {
      url: 'http://someurl.com/image.jpg',
      dest: '/tmp/image.jpg',
    };

    download.image(options)
      .then(() => done())
      .catch((err) => {
        done(err);
      });
  });
});