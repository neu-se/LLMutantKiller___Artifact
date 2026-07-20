import path from 'path';
import nock = require('nock');

const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

const fixturesPath = path.join(
  __dirname,
  '../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg'
);

describe('relative path resolution', () => {
  it('should resolve a relative dest path to an absolute path', async () => {
    nock('http://example-relative-test.com')
      .get('/image-success.png')
      .replyWithFile(200, fixturesPath, {
        'Content-Type': 'image/jpeg',
      });

    const result = await download.image({
      url: 'http://example-relative-test.com/image-success.png',
      dest: './tmp',
    });

    expect(path.isAbsolute(result.filename)).toBe(true);
  });
});