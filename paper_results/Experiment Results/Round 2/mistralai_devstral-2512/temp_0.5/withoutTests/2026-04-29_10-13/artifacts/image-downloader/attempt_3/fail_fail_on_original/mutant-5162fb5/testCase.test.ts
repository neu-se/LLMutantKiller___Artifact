import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';
import os from 'os';

describe('image downloader', () => {
  it('should resolve relative destination path to absolute path', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'image-downloader-test-'));
    const relativeDest = 'downloads';
    const testFile = 'test.jpg';

    try {
      const result = await image({
        url: `https://example.com/${testFile}`,
        dest: path.join(tempDir, relativeDest),
        extractFilename: false
      });

      const expectedPath = path.resolve(tempDir, relativeDest);
      expect(result.filename).toBe(expectedPath);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});