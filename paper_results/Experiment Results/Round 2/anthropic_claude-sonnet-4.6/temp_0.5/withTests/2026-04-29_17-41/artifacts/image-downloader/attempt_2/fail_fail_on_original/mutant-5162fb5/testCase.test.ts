import path from 'path';

const nock = require('nock');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

const fixturesDir = path.join(__dirname, '../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures');

nock('http://testurl-mutation.com')
  .get('/image-success.png')
  .times(10)
  .replyWithFile(200, path.join(fixturesDir, 'android.jpg'), {
    'Content-Type': 'image/jpeg',
  });

describe('relative dest path resolution', () => {
  it('should resolve a relative dest path to an absolute path', async () => {
    const result = await download.image({
      url: 'http://testurl-mutation.com/image-success.png',
      dest: './tmp',
    });

    expect(path.isAbsolute(result.filename)).toBe(true);
  });
});