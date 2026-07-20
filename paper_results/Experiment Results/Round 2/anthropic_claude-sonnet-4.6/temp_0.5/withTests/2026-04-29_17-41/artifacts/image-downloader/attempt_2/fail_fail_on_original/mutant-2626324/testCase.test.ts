import path = require('path');
import nock = require('nock');

const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

const fixturesPath = path.join(
  __dirname,
  '../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg'
);

nock('http://testrelative.com')
  .get('/image-relative-test.png')
  .replyWithFile(200, fixturesPath, {
    'Content-Type': 'image/jpeg',
  });

describe('relative dest path resolution', () => {
  it('should resolve a relative dest path to an absolute path', async () => {
    const result = await download.image({
      url: 'http://testrelative.com/image-relative-test.png',
      dest: './tmp',
    });

    expect(path.isAbsolute(result.filename)).toBe(true);
  });
});