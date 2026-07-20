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

    // Intentionally corrupt the write stream to trigger an error
    const originalCreateWriteStream = fs.createWriteStream;
    fs.createWriteStream = () => {
      const stream = originalCreateWriteStream(options.dest);
      stream.write = () => {
        stream.emit('error', new Error('Mocked error'));
      };
      return stream;
    };

    download.image(options)
      .then(() => done(new Error('Should throw an error')))
      .catch((err) => {
        expect(err).toBeInstanceOf(Error);
        fs.createWriteStream = originalCreateWriteStream;
        done();
      });
  });
});