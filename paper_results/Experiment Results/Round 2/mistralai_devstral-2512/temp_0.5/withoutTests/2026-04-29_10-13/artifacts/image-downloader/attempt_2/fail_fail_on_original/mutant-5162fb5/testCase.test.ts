import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs/promises';
import os from 'os';
import nock from 'nock';

describe('image downloader', () => {
  it('should resolve relative destination path to absolute path', async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'image-downloader-test-'));
    const relativeDest = 'downloads';
    const testFile = 'test.jpg';

    try {
      nock('https://example.com')
        .get(`/${testFile}`)
        .reply(200, 'test content');

      const result = await image({
        url: `https://example.com/${testFile}`,
        dest: path.join(tempDir, relativeDest),
        extractFilename: false
      });

      const expectedPath = path.resolve(tempDir, relativeDest);
      expect(result).toBeUndefined();
      expect(fs.existsSync(expectedPath)).toBe(true);
    } finally {
      nock.cleanAll();
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });
});