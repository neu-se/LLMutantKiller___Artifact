import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs/promises';
import os from 'os';

describe('image downloader', () => {
  it('should resolve relative destination path to absolute path', async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'image-downloader-test-'));
    const relativeDest = 'downloads';
    const expectedAbsoluteDest = path.resolve(tempDir, relativeDest, 'test.jpg');

    try {
      const mockRequest = jest.fn().mockResolvedValue(undefined);
      jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js', () => mockRequest, { virtual: true });

      await image({
        url: 'https://example.com/test.jpg',
        dest: relativeDest,
        extractFilename: false
      });

      expect(mockRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          dest: expect.stringMatching(new RegExp(`^${path.resolve(tempDir, relativeDest)}$`))
        })
      );
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });
});