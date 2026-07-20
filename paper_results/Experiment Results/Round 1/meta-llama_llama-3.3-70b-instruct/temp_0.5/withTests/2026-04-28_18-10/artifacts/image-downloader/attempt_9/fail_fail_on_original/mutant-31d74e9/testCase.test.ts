import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/index';
import nock from 'nock';
import fs from 'fs';
import path from 'path';

describe('download an image', () => {
  it('should fail with an error when the "error" event is not listened', (done) => {
    nock('http://someurl.com')
      .get('/image.jpg')
      .reply(200, 'image data', {
        'Content-Type': 'image/jpeg',
      });

    const options = {
      url: 'http://someurl.com/image.jpg',
      dest: '/tmp/image.jpg',
    };

    const originalCreateWriteStream = fs.createWriteStream;
    fs.createWriteStream = () => {
      const stream = originalCreateWriteStream(options.dest);
      stream.on = (event, callback) => {
        if (event === 'error') {
          callback(new Error('Mocked error'));
        }
      };
      return stream;
    };

    const request = require('../../../../../../../../../subject_repositories/image-downloader/lib/request');
    request({ url: options.url, dest: options.dest })
      .then(() => {
        fs.createWriteStream = originalCreateWriteStream;
        done(new Error('Should throw an error'));
      })
      .catch(() => {
        fs.createWriteStream = originalCreateWriteStream;
        done();
      });
  });
});