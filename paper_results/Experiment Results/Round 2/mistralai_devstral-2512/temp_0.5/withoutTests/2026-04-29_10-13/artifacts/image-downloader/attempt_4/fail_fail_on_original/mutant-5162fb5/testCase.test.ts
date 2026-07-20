import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';
import os from 'os';

describe('image downloader', () => {
  it('should resolve relative destination path to absolute path', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'image-downloader-test-'));
    const relativeDest = 'downloads';
    const absoluteDest = path.resolve(tempDir, relativeDest);

    try {
      // Mock the request module to avoid actual network calls
      jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js', () => ({
        __esModule: true,
        default: jest.fn((options) => {
          return Promise.resolve({
            filename: options.dest
          });
        })
      }));

      const result = await image({
        url: 'https://example.com/test.jpg',
        dest: relativeDest,
        extractFilename: false
      });

      expect(result.filename).toBe(absoluteDest);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});