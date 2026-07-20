import path from 'path';
import nock from 'nock';
import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('path.isAbsolute mutation detection', () => {
  it('should not normalize an already absolute path with ".." segments', async () => {
    nock('http://someurl.com')
      .get('/image-success.png')
      .replyWithFile(200, path.join(process.cwd(), 'test/fixtures/android.jpg'), {
        'Content-Type': 'image/jpeg',
      });

    const unnormalizedDest = '/tmp/../tmp/image-success.png';
    const result = await image({ url: 'http://someurl.com/image-success.png', dest: unnormalizedDest, extractFilename: false });
    
    // Original: since dest is absolute, it stays as '/tmp/../tmp/image-success.png'
    // Mutated: path.resolve is applied, normalizing to '/tmp/image-success.png'
    expect(result.filename).toEqual('/tmp/../tmp/image-success.png');
  });
});