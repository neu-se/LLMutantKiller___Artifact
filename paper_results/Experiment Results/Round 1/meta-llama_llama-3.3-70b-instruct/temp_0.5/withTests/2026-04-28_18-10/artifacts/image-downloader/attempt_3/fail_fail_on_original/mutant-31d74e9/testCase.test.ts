import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';
import nock from 'nock';
import fs from 'fs';
import path from 'path';

describe('download an image', () => {
  it('should pass with an error event listened', (done) => {
    nock('http://someurl.com')
      .get('/image.jpg')
      .reply(200, 'image data', {
        'Content-Type': 'image/jpeg',
      });

    const options = {
      url: 'http://someurl.com/image.jpg',
      dest: '/tmp/image.jpg',
    };

    download(options)
      .then(() => done())
      .catch((err) => {
        done(err);
      });
  });
});