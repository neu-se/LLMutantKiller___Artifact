const nock = require('nock');
const request = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js');

describe('request error message on non-200 status code', () => {
  it('should include the status code in the error message when response is not 200', async () => {
    nock('http://testurl.com')
      .get('/image-404.jpg')
      .reply(404, 'Not Found');

    let errorMessage = '';
    try {
      await request({ url: 'http://testurl.com/image-404.jpg', dest: '/tmp/image-404.jpg' });
    } catch (err: any) {
      errorMessage = err.message;
    }

    expect(errorMessage).toContain('404');
  });
});