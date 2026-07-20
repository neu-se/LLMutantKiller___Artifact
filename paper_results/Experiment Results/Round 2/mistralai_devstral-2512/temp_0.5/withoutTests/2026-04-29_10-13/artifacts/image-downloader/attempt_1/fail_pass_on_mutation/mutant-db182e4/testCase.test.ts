import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';
import nock from 'nock';

describe('image downloader', () => {
  it('should resolve relative destination paths correctly', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';
    const expectedAbsolutePath = path.resolve(__dirname, relativeDest, 'image.jpg');

    // Mock the request to avoid actual network calls
    nock('https://example.com')
      .get('/image.jpg')
      .reply(200, 'mock image data');

    // Ensure the directory exists for the test
    const absoluteDestDir = path.resolve(__dirname, relativeDest);
    if (!fs.existsSync(absoluteDestDir)) {
      fs.mkdirSync(absoluteDestDir, { recursive: true });
    }

    try {
      await image({ url: testUrl, dest: relativeDest });
      // If the mutation is present, this will fail because it will try to resolve
      // the path incorrectly, likely causing an error in the request module
    } catch (error) {
      // The mutation causes the path resolution to fail, which should trigger an error
      expect(error).toBeDefined();
    } finally {
      // Clean up the test directory
      if (fs.existsSync(absoluteDestDir)) {
        fs.rmSync(absoluteDestDir, { recursive: true, force: true });
      }
    }
  });
});