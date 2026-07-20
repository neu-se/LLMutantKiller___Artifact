import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';
import nock from 'nock';

describe('image downloader', () => {
  it('should handle relative destination paths correctly', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';
    const expectedAbsolutePath = path.resolve(__dirname, relativeDest, 'image.jpg');

    // Mock the request to return a successful response
    nock('https://example.com')
      .get('/image.jpg')
      .reply(200, 'mock image data');

    // Ensure the directory exists for the test
    const absoluteDestDir = path.resolve(__dirname, relativeDest);
    if (!fs.existsSync(absoluteDestDir)) {
      fs.mkdirSync(absoluteDestDir, { recursive: true });
    }

    // Spy on path.resolve to verify it's called with the correct arguments
    const originalResolve = path.resolve;
    const resolveSpy = jest.spyOn(path, 'resolve').mockImplementation((...args) => {
      // In the mutated version, this will be called with incorrect arguments
      // because the condition is always true
      return originalResolve(...args);
    });

    try {
      await image({ url: testUrl, dest: relativeDest });

      // In the original code, path.resolve should be called with __dirname and the relative path
      // In the mutated code, it will be called with different arguments due to the always-true condition
      expect(resolveSpy).toHaveBeenCalledWith(__dirname, relativeDest, 'image.jpg');

      // Verify the file was written to the correct location
      expect(fs.existsSync(expectedAbsolutePath)).toBe(true);
    } finally {
      resolveSpy.mockRestore();
      // Clean up the test directory
      if (fs.existsSync(absoluteDestDir)) {
        fs.rmSync(absoluteDestDir, { recursive: true, force: true });
      }
      nock.cleanAll();
    }
  });
});