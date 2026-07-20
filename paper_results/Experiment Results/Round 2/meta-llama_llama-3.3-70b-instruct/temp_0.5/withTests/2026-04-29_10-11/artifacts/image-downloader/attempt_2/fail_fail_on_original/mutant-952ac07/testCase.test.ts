import nock from 'nock';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('request', () => {
  it('should reject with an error when the request emits an error event', async () => {
    const url = 'http://someurl.com/image-error.jpg';
    nock(url)
      .get(/error/)
      .times(100)
      .replyWithError('Mocked error');

    const originalOn = request.toString().includes('.on("error"');
    await expect(request({ url, dest: '/tmp' })).rejects.toThrowError();
    if (!originalOn) {
      throw new Error("Test failed because the original code does not contain '.on('error')");
    }
  });
});