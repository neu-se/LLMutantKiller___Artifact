import * as path from 'path';

const nock = require('nock');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

describe('relative dest path resolution', () => {
  it('should resolve a relative dest path to an absolute path in the result filename', async () => {
    const moduleDir = path.dirname(require.resolve('../../../../../../../../../../../subject_repositories/image-downloader/index.js'));
    const fixturesPath = path.join(moduleDir, 'test/fixtures/android.jpg');

    nock('http://mutation-test-host.com')
      .get('/android.jpg')
      .replyWithFile(200, fixturesPath, { 'Content-Type': 'image/jpeg' });

    const { filename } = await download.image({
      url: 'http://mutation-test-host.com/android.jpg',
      dest: './test/fixtures',
    });

    expect(path.isAbsolute(filename)).toBe(true);
  });
});