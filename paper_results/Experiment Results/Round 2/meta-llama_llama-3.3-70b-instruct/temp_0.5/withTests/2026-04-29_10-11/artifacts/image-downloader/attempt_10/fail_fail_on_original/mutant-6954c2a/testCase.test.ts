import { download } from '../../../../../../../../../../../subject_repositories/image-downloader';

describe('download an image', () => {
  it('should reject with a meaningful error message when the status code is not 200', async () => {
    try {
      await download.image({ url: 'http://someurl.com/error', dest: '/tmp' });
      throw new Error('Expected an error to be thrown');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('Request Failed');
      } else {
        throw new Error('Expected an error to be thrown');
      }
    }
  });
});