import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import nock from 'nock';
import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('image downloader relative path resolution', () => {
  it('should resolve relative dest path to absolute path when dest is relative', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'image-downloader-test-'));
    const imageContent = Buffer.from('fake image content');
    
    nock('http://example.com')
      .get('/photo.jpg')
      .reply(200, imageContent, {
        'Content-Type': 'image/jpeg',
      });

    // Use a relative path - original code should resolve it to absolute
    // We need to use a relative path that, when resolved with __dirname of index.js,
    // points somewhere we can check
    const relativeDest = path.relative(
      path.dirname(require.resolve('../../../../../../../../../../../subject_repositories/image-downloader/index.js')),
      tmpDir
    );

    try {
      const result = await image({
        url: 'http://example.com/photo.jpg',
        dest: relativeDest,
        extractFilename: true,
      });

      // In original code, dest is resolved to absolute path
      // The result filename should be an absolute path
      expect(path.isAbsolute(result.filename)).toBe(true);
      
      // The file should exist at the resolved absolute path
      expect(fs.existsSync(result.filename)).toBe(true);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      nock.cleanAll();
    }
  });
});