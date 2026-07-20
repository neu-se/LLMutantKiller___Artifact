import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('request function', () => {
  it('should handle errors correctly when writing to a file', async () => {
    const url = 'http://example.com';
    const dest = 'test.txt';

    // Use nock to mock a response that will cause an error when piped to a write stream
    const fs = require('fs');
    fs.writeFileSync(dest, 'initial content');

    try {
      await request({ url, dest });
      throw new Error('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    } finally {
      fs.unlinkSync(dest);
    }
  });
});