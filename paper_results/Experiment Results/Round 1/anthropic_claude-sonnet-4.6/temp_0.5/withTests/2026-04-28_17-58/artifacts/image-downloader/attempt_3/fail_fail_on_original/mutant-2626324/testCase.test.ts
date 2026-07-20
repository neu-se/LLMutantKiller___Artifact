import path from 'path';

const nock = require('../../../../../../../../../../../subject_repositories/image-downloader/node_modules/nock');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

const fixturesPath = path.join(
  __dirname,
  '../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg'
);

describe('relative path resolution', () => {
  it('should resolve a relative dest path to an absolute path', async () => {
    nock('http://example-relative-mutation-test.com')
      .get('/image-success.png')
      .replyWithFile(200, fixturesPath, {
        'Content-Type': 'image/jpeg',
      });

    const result = await download.image({
      url: 'http://example-relative-mutation-test.com/image-success.png',
      dest: '/tmp',
    });

    // The filename should be an absolute path
    expect(path.isAbsolute(result.filename)).toBe(true);
    // The filename should contain the image name
    expect(result.filename).toMatch(/image-success\.png$/);
    // The resolved path should be based on the module's __dirname, not the cwd
    // Original: path.resolve(__dirname_of_index, '/tmp') => '/tmp/image-success.png'
    // We use a relative dest to detect the mutation
    const relativeResult = await (async () => {
      nock('http://example-relative-mutation-test2.com')
        .get('/image-check.png')
        .replyWithFile(200, fixturesPath, {
          'Content-Type': 'image/jpeg',
        });

      return download.image({
        url: 'http://example-relative-mutation-test2.com/image-check.png',
        dest: path.relative(process.cwd(), '/tmp'),
      });
    })();

    expect(path.isAbsolute(relativeResult.filename)).toBe(true);
  });
});