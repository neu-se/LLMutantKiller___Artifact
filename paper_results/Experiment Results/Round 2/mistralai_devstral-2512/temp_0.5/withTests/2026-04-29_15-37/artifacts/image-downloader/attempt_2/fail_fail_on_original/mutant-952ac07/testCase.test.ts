import * as fs from 'fs';
import * as path from 'path';
import nock from 'nock';
import { download } from '../..';

describe('request error handling', () => {
  it('should handle request errors properly', (done) => {
    nock('http://example.com')
      .get('/image.jpg')
      .replyWithError('Network error');

    const dest = path.join(__dirname, 'test-image.jpg');

    download.image({ url: 'http://example.com/image.jpg', dest })
      .then(() => {
        done(new Error('Expected request to fail with network error'));
      })
      .catch((err) => {
        expect(err.message).toBe('Network error');
        done();
      });
  });
});