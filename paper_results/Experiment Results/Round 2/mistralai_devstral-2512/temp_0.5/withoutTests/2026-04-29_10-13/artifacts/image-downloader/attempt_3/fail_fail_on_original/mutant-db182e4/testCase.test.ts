import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';

describe('image downloader', () => {
  it('should correctly handle relative destination paths', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';
    const expectedAbsolutePath = path.resolve(__dirname, relativeDest, 'image.jpg');

    // Create a mock request function that verifies the resolved path
    const originalRequest = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request');
    const requestSpy = jest.spyOn(originalRequest, 'default').mockImplementation((options) => {
      // In the original code, options.dest should be an absolute path
      // In the mutated code, it will remain relative due to the always-true condition
      if (!path.isAbsolute(options.dest)) {
        throw new Error('Destination path should be absolute');
      }
      return Promise.resolve();
    });

    try {
      await image({ url: testUrl, dest: relativeDest });
      expect(requestSpy).toHaveBeenCalled();
    } finally {
      requestSpy.mockRestore();
    }
  });
});