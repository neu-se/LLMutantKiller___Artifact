import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import nock from 'nock';
import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('image downloader - relative path resolution', () => {
  it('should resolve a relative dest path to an absolute path based on module directory', async () => {
    const imageContent = Buffer.from('fake-image-data');
    
    nock('http://example.com')
      .get('/test.png')
      .reply(200, imageContent, {
        'Content-Type': 'image/png',
      });

    // Use a relative path for dest
    const relativeDest = 'test-output.png';
    
    let result: { filename: string; image: Buffer };
    try {
      result = await image({
        url: 'http://example.com/test.png',
        dest: relativeDest,
        extractFilename: false,
      });
    } catch (e) {
      // If it fails, the mutation may have caused the path to not be resolved correctly
      throw e;
    }

    // The original code resolves relative paths using path.resolve(__dirname, options.dest)
    // where __dirname is the directory of index.js in the subject repository
    const subjectRepoDir = path.dirname(require.resolve('../../../../../../../../../../../subject_repositories/image-downloader/index.js'));
    const expectedAbsolutePath = path.resolve(subjectRepoDir, relativeDest);

    // With original code: relative path gets resolved to absolute path based on module's __dirname
    // With mutated code: relative path does NOT get resolved (stays relative), so the saved path would differ
    expect(result.filename).toBe(expectedAbsolutePath);

    // Cleanup
    if (fs.existsSync(expectedAbsolutePath)) {
      fs.unlinkSync(expectedAbsolutePath);
    }
  });
});