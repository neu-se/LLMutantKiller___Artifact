import path from 'path';
import nock from 'nock';
import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

const fixturesPath = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', '..', '..', '..', '..', '..', '..', '..', '..', '..', 'subject_repositories', 'image-downloader', 'test', 'fixtures', 'android.jpg');

describe('relative path resolution', () => {
  it('should resolve a relative dest path to an absolute path', async () => {
    nock('http://example.com')
      .get('/image-success.png')
      .replyWithFile(200, fixturesPath, {
        'Content-Type': 'image/jpeg',
      });

    const result = await (image as Function)({
      url: 'http://example.com/image-success.png',
      dest: './tmp',
    });

    expect(path.isAbsolute(result.filename)).toBe(true);
  });
});