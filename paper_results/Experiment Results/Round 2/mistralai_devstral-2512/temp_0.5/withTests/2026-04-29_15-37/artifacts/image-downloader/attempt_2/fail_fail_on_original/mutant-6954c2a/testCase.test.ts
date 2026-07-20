// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/image-downloader/attempt_1/pending_category/mutant-6954c2a/testCase.test.ts
import nock from 'nock';
import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('Error message validation', () => {
  it('should reject with a properly formatted error message for non-200 status codes', (done) => {
    nock('http://someurl.com')
      .get('/image-error.jpg')
      .reply(404, 'Not Found');

    download.image({ url: 'http://someurl.com/image-error.jpg', dest: '/tmp/test-image.jpg' })
      .then(() => done(new Error('Should throw an error')))
      .catch((err: Error) => {
        expect(err.message).toMatch('Request Failed.');
        expect(err.message).toMatch('Status Code: 404');
        done();
      });
  });
});