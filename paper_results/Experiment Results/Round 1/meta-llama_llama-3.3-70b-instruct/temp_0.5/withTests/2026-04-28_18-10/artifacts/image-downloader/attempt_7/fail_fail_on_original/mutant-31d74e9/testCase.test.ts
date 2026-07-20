import { download } from '../index';
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
      .then(() => {
        const stats = fs.statSync(options.dest);
        if (stats.size > 0) {
          done();
        } else {
          done(new Error('Download failed'));
        }
      })
      .catch((err) => {
        done(err);
      });
  });
});