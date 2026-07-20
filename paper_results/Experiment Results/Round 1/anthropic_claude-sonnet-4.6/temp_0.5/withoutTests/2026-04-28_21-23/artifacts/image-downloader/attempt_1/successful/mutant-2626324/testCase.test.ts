import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import nock from 'nock';
import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('image downloader - relative path resolution', () => {
  it('should resolve a relative dest path to an absolute path based on the module directory', async () => {
    const imageContent = Buffer.from('fake image data');
    
    nock('http://example.com')
      .get('/image.png')
      .reply(200, imageContent, {
        'Content-Type': 'image/png',
      });

    // Use a relative path for dest
    const relativeDest = 'test-output-image.png';
    
    // The expected resolved path should be relative to the module's __dirname
    // which is the subject_repositories/image-downloader directory
    const moduleDir = path.dirname(require.resolve('../../../../../../../../../../../subject_repositories/image-downloader/index.js'));
    const expectedAbsoluteDest = path.resolve(moduleDir, relativeDest);
    
    let result: { filename: string; image: Buffer } | undefined;
    let error: Error | undefined;
    
    try {
      result = await image({
        url: 'http://example.com/image.png',
        dest: relativeDest,
        extractFilename: false,
      }) as { filename: string; image: Buffer };
    } catch (e) {
      error = e as Error;
    }
    
    // Clean up if file was created
    if (result?.filename && fs.existsSync(result.filename)) {
      fs.unlinkSync(result.filename);
    }
    if (fs.existsSync(expectedAbsoluteDest)) {
      fs.unlinkSync(expectedAbsoluteDest);
    }
    
    // In the original code, the relative path should be resolved to an absolute path
    // The result filename should be the absolute resolved path
    expect(error).toBeUndefined();
    expect(result).toBeDefined();
    expect(result!.filename).toBe(expectedAbsoluteDest);
    // The filename should be absolute
    expect(path.isAbsolute(result!.filename)).toBe(true);
  });
});