import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('request function', () => {
  it('should handle request errors correctly', async () => {
    const url = 'http://example.com/non-existent-url';
    const dest = 'test.txt';

    // The original code should reject with an error when the request fails
    // The mutated code should not reject with an error when the request fails
    // Because the event listener is not correctly attached
    await expect(request({ url, dest })).rejects.toThrowError();
  });
});