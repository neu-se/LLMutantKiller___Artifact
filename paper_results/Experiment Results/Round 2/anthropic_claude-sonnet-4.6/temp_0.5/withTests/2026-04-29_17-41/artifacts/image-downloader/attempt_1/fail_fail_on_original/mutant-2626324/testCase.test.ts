import path from 'path';
import nock from 'nock';
import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

const fixturesPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg');

describe('relative dest path resolution', () => {
  it('should resolve a relative dest path to an absolute path', async () => {
    nock('http://testurl.com')
      .get('/image-success.png')
      .replyWithFile(200, fixturesPath, {
        'Content-Type': 'image/jpeg',
      });

    const result = await image({
      url: 'http://testurl.com/image-success.png',
      dest: './tmp',
    });

    expect(path.isAbsolute(result.filename)).toBe(true);
  });
});