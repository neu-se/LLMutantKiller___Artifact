import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';
import nock from 'nock';

describe('image downloader', () => {
  it('should resolve relative destination path to absolute path', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';
    const expectedAbsoluteDest = path.resolve(__dirname, relativeDest, 'image.jpg');

    // Mock the request to avoid actual network call
    nock('https://example.com')
      .get('/image.jpg')
      .reply(200, 'mock image data');

    await image({ url: testUrl, dest: relativeDest });

    // Verify the file was created at the expected absolute path
    expect(fs.existsSync(expectedAbsoluteDest)).toBe(true);

    // Clean up
    fs.unlinkSync(expectedAbsoluteDest);
    nock.cleanAll();
  });
});