import path from 'path';
import nock from 'nock';
import * as download from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('path resolution behavior', () => {
  it('should resolve relative dest path correctly and return an absolute filename', async () => {
    nock('http://someurl.com')
      .get('/image-success.png')
      .replyWithFile(200, path.join(__dirname, '../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg'), {
        'Content-Type': 'image/jpeg',
      });

    const { filename } = await (download as any).image({
      url: 'http://someurl.com/image-success.png',
      dest: './test/fixtures/someurl.com',
    });

    expect(path.isAbsolute(filename)).toBe(true);
    expect(filename).toMatch(/test\/fixtures\/someurl\.com$/);
  });
});