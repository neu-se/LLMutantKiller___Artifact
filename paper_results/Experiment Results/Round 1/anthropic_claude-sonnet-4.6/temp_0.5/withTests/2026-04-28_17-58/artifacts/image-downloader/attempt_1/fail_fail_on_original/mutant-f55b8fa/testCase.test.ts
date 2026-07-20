import * as path from 'path';
import * as nock from 'nock';
import * as download from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('relative dest path resolution', () => {
  it('should resolve a relative dest path to an absolute path', async () => {
    nock('http://example.com')
      .get('/image-success.png')
      .replyWithFile(200, path.join(__dirname, '../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg'), {
        'Content-Type': 'image/jpeg',
      });

    const result = await (download as any).image({
      url: 'http://example.com/image-success.png',
      dest: './test/fixtures',
    });

    expect(path.isAbsolute(result.filename)).toBe(true);
  });
});