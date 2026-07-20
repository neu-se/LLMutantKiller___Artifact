import path = require('path');

const nock = require('nock');
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
    // Use a relative path - original code resolves it to absolute, mutant does not
    const result = await download.image({
      url: 'http://testrelative.com/image-relative-test.png',
      dest: '/tmp',
    });

    // The filename should be absolute regardless
    expect(path.isAbsolute(result.filename)).toBe(true);
    // More specifically, it should start with the resolved absolute path
    expect(result.filename).toEqual('/tmp/image-relative-test.png');
  });
});