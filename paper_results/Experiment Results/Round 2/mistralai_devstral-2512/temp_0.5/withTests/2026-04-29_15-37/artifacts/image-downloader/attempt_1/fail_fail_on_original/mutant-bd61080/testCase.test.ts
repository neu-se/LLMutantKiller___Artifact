import { createWriteStream } from 'fs';
import { http, https } from 'follow-redirects';
import nock from 'nock';
import path from 'path';

const download = require('../index');

describe('Error message validation', () => {
  it('should include status code in error message for non-200 responses', (done) => {
    nock('http://test.com')
      .get('/error')
      .reply(404, 'Not Found');

    download.image({ url: 'http://test.com/error', dest: '/tmp/test-error.jpg' })
      .then(() => done(new Error('Should have rejected with error')))
      .catch((err: Error) => {
        expect(err.message).toContain('Status Code: 404');
        done();
      });
  });
});