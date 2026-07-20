// eslint-disable-next-line @typescript-eslint/no-var-requires
const nock = require('../../../../../../../../../../../subject_repositories/image-downloader/node_modules/nock');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestFn = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js');

nock('http://error-test.com')
  .get('/network-error.jpg')
  .replyWithError('ECONNREFUSED: Connection refused');

describe('request error handling', () => {
  it('should reject the promise when the HTTP request emits a network error', async () => {
    await expect(
      requestFn({
        url: 'http://error-test.com/network-error.jpg',
        dest: '/tmp/network-error-test.jpg',
      })
    ).rejects.toThrow();
  });
});