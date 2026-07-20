import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import nock from 'nock';

describe('image downloader path resolution', () => {
  it('should resolve a relative dest path to an absolute path before downloading', async () => {
    // Clear require cache to ensure fresh module load
    delete require.cache[require.resolve('../../../../../../../../../../../subject_repositories/image-downloader/index.js')];
    
    const { image } = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'img-dl-test-'));

    try {
      const imageData = Buffer.from('fake-image-content');

      nock('http://example.com')
        .get('/photo.jpg')
        .reply(200, imageData, { 'content-type': 'image/jpeg' });

      // Use a relative path by getting a relative version of tmpDir
      const relativeDest = path.relative(process.cwd(), tmpDir);

      const result = await image({
        url: 'http://example.com/photo.jpg',
        dest: relativeDest,
        extractFilename: true,
      });

      // In the original code, the relative path gets resolved to absolute
      // In the mutated code, it stays relative
      expect(path.isAbsolute(result.filename)).toBe(true);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      nock.cleanAll();
    }
  });
});