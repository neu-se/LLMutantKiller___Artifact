import { request } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request";
import nock from 'nock';

describe('request', () => {
  it('should reject with an error when the request emits an error event', async () => {
    const url = 'http://someurl.com/image-error.jpg';
    nock(url)
      .get(/error/)
      .times(100)
      .replyWithError('Mocked error');

    const result = await request({ url, dest: '/tmp' }).catch((error) => error);
    if (result instanceof Error) {
      expect(result).toBeInstanceOf(Error);
    } else {
      throw new Error("Test failed because the request didn't reject with an error");
    }
  });
});