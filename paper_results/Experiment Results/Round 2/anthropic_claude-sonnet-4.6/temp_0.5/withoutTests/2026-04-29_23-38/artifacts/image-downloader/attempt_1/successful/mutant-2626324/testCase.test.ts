import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import nock from 'nock';
import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('image downloader - relative dest path resolution', () => {
  it('should resolve a relative dest path to an absolute path based on the module directory', async () => {
    const imageContent = Buffer.from('fake image data');
    const filename = 'test-image.jpg';
    
    nock('http://example.com')
      .get(`/${filename}`)
      .reply(200, imageContent, {
        'Content-Type': 'image/jpeg',
      });

    // Use a relative dest path
    const relativeDest = 'temp-test-output';
    const absoluteExpectedDest = path.resolve(
      path.dirname(require.resolve('../../../../../../../../../../../subject_repositories/image-downloader/index.js')),
      relativeDest,
      filename
    );

    // Ensure the directory exists for the original code path
    const absoluteDir = path.dirname(absoluteExpectedDest);
    if (!fs.existsSync(absoluteDir)) {
      fs.mkdirSync(absoluteDir, { recursive: true });
    }

    try {
      const result = await image({
        url: `http://example.com/${filename}`,
        dest: relativeDest,
        extractFilename: true,
      });

      // In the original code, dest should be resolved to an absolute path
      // In the mutated code, dest remains relative, so the resolved path would be different
      expect(path.isAbsolute(result.filename)).toBe(true);
      expect(result.filename).toBe(absoluteExpectedDest);
    } finally {
      // Cleanup
      if (fs.existsSync(absoluteExpectedDest)) {
        fs.unlinkSync(absoluteExpectedDest);
      }
      if (fs.existsSync(absoluteDir)) {
        try {
          fs.rmdirSync(absoluteDir);
        } catch {
          // ignore if not empty
        }
      }
      nock.cleanAll();
    }
  });
});