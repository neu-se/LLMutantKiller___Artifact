import nock from 'nock';
import request from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request";

describe('request', () => {
  it('should reject with an error when the request emits an error event', async () => {
    const url = 'http://someurl.com/image-error.jpg';
    nock(url)
      .get(/error/)
      .times(100)
      .replyWithError('Mocked error');

    try {
      await request({ url, dest: '/tmp' });
      throw new Error("Test failed because the request didn't reject with an error");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});