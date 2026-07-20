import { download } from '../index';
import nock from 'nock';
import fs from 'fs';
import path from 'path';

describe('download an image', () => {
  it('should fail with an error when the "error" event is not listened', (done) => {
    nock('http://someurl.com')
      .get(/error/)
      .times(100)
      .replyWithFile(200, path.join(__dirname, 'fixtures/android.jpg'), {
        'Content-Type': 'image/jpeg',
      });

    const options = {
      url: 'http://someurl.com/image-error.jpg',
      dest: '/tmp/image-error.jpg',
    };

    download.image(options)
      .then(() => done(new Error('Should throw an error')))
      .catch((err) => {
        expect(err).toBeInstanceOf(Error);
        done();
      });
  });
});