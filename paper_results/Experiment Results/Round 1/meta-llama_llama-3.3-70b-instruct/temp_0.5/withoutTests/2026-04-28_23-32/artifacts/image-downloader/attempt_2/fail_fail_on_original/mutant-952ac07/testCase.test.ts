import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';
import nock from 'nock';

describe('request function', () => {
  it('should handle request errors correctly', async () => {
    const url = 'http://example.com';
    const dest = 'test.txt';

    // Mock the request to fail
    nock('http://example.com')
     .get('/')
     .replyWithError('Mocked error');

    await expect(request({ url, dest })).rejects.toThrowError();
  });
});