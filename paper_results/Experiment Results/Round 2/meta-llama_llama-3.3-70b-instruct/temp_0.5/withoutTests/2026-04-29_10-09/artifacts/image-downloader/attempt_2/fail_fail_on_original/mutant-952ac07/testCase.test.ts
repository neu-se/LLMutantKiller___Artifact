import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';
import nock from 'nock';
import fs from 'fs';

describe('request', () => {
  it('should reject the promise when an error occurs during the request', async () => {
    // Arrange
    const url = 'http://example.com';
    const dest = 'example.txt';
    const options = {};

    // Mock the request to return an error
    nock('http://example.com')
      .get('/')
      .replyWithError('Test error');

    // Act and Assert
    await expect(request({ url, dest, ...options })).rejects.toThrow(Error);

    // Clean up
    nock.cleanAll();
    try {
      fs.unlinkSync(dest);
    } catch (err) {
      // File does not exist, ignore error
    }
  });
});