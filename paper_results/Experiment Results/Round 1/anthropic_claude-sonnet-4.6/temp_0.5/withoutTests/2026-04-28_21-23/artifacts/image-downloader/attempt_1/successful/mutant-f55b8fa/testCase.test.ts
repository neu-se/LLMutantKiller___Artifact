import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import nock from 'nock';
import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('image downloader - relative path resolution', () => {
  it('should resolve a relative dest path to an absolute path based on the module directory', async () => {
    const imageContent = Buffer.from('fake image data');
    
    nock('http://example.com')
      .get('/test.png')
      .reply(200, imageContent, {
        'Content-Type': 'image/png',
      });

    // Use a relative path as dest
    const relativeDest = 'test.png';
    
    // The original code should resolve relative paths using path.resolve(__dirname, dest)
    // __dirname of index.js is the subject_repositories/image-downloader directory
    const moduleDir = path.dirname(require.resolve('../../../../../../../../../../../subject_repositories/image-downloader/index.js'));
    const expectedAbsolutePath = path.resolve(moduleDir, relativeDest);

    let savedPath: string | undefined;
    
    try {
      const result = await image({
        url: 'http://example.com/test.png',
        dest: relativeDest,
        extractFilename: false,
      });
      
      // The result should contain the filename/path where the image was saved
      savedPath = (result as any).filename;
      
      // With original code: relative path gets resolved to absolute path based on module __dirname
      // With mutated code: relative path does NOT get resolved (condition is inverted)
      // The saved path should be the absolute resolved path
      expect(savedPath).toBe(expectedAbsolutePath);
    } finally {
      // Cleanup: remove the file if it was created
      if (savedPath && fs.existsSync(savedPath)) {
        fs.unlinkSync(savedPath);
      }
      // Also try to clean up the expected path
      if (fs.existsSync(expectedAbsolutePath)) {
        fs.unlinkSync(expectedAbsolutePath);
      }
    }
  });
});