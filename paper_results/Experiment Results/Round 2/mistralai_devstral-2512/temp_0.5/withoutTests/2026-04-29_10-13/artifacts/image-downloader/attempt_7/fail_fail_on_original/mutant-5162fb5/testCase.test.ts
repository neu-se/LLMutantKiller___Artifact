import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';
import os from 'os';

describe('image downloader path resolution', () => {
  it('should convert relative destination path to absolute path', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'image-downloader-test-'));
    const relativeDest = 'downloads/test.jpg';

    try {
      const requestModule = await import('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js');
      const requestSpy = jest.spyOn(requestModule, 'default').mockImplementation((options: any) => {
        return Promise.resolve({
          filename: options.dest
        });
      });

      const result = await image({
        url: 'https://example.com/image.jpg',
        dest: relativeDest,
        extractFilename: false
      });

      const expectedAbsolutePath = path.resolve(__dirname, relativeDest);
      expect(result.filename).toBe(expectedAbsolutePath);
      expect(path.isAbsolute(result.filename)).toBe(true);

      requestSpy.mockRestore();
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});