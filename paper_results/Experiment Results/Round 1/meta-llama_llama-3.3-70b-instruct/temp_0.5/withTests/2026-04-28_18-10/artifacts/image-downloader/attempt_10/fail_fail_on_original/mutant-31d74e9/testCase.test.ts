import { download } from '../index';
import nock from 'nock';
import fs from 'fs';
import path from 'path';

describe('download an image', () => {
  it('should pass with a successful download and error event listened', (done) => {
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

    download.image(options)
      .then(() => {
        fs.createWriteStream = originalCreateWriteStream;
        done(new Error('Should throw an error'));
      })
      .catch((err) => {
        fs.createWriteStream = originalCreateWriteStream;
        done();
      });
  });
});