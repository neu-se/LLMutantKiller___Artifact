import nock from 'nock';
import path from 'path';
import download from '../index';

describe('request error handling', () => {
  it('should reject with a properly formatted error message for non-200 status codes', (done) => {
    nock('http://example.com')
      .get('/image.jpg')
      .reply(404, 'Not Found');

    download.image({ url: 'http://example.com/image.jpg', dest: '/tmp/test.jpg' })
      .then(() => done(new Error('Should have rejected with an error')))
      .catch((err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toContain('Status Code: 404');
        expect(err.message).toContain('Request Failed');
        done();
      });
  });
});