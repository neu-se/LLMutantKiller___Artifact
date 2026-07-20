import path = require('path');

const nock = require('nock');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

const projectRoot = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/image-downloader');
const fixturesPath = path.join(projectRoot, 'test/fixtures/android.jpg');

nock('http://testrelative.com')
  .get('/image-relative-resolve-test.png')
  .replyWithFile(200, fixturesPath, {
    'Content-Type': 'image/jpeg',
  });

describe('relative dest path resolution', () => {
  it('should resolve relative dest to absolute path based on index.js __dirname', async () => {
    // Use a relative dest path - original resolves it relative to index.js __dirname
    // mutant leaves it as-is (relative)
    const result = await download.image({
      url: 'http://testrelative.com/image-relative-resolve-test.png',
      dest: 'test/fixtures',
    });

    // Original: path.resolve(<index.js __dirname>, 'test/fixtures') + filename
    const expectedFilename = path.join(projectRoot, 'test/fixtures/image-relative-resolve-test.png');

    expect(result.filename).toEqual(expectedFilename);
  });
});