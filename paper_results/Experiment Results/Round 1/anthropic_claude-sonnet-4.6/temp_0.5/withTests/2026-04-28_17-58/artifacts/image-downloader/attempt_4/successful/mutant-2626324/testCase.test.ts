import path from 'path';
import fs from 'fs';

const nock = require('../../../../../../../../../../../subject_repositories/image-downloader/node_modules/nock');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

const projectRoot = path.join(__dirname, '../../../../../../../../../../../subject_repositories/image-downloader');
const fixturesPath = path.join(projectRoot, 'test/fixtures/android.jpg');

// A relative path from the image-downloader project root to its test/fixtures dir
const relativeDestFromProjectRoot = './test/fixtures';

describe('relative path resolution', () => {
  it('should resolve a relative dest to an absolute path based on the module directory', async () => {
    nock('http://mutation-detect-test.com')
      .get('/android.jpg')
      .replyWithFile(200, fixturesPath, {
        'Content-Type': 'image/jpeg',
      });

    const result = await download.image({
      url: 'http://mutation-detect-test.com/android.jpg',
      dest: relativeDestFromProjectRoot,
    });

    // The returned filename must be absolute
    expect(path.isAbsolute(result.filename)).toBe(true);
    // The file must actually exist at the returned path
    expect(() => fs.accessSync(result.filename)).not.toThrow();
  });
});