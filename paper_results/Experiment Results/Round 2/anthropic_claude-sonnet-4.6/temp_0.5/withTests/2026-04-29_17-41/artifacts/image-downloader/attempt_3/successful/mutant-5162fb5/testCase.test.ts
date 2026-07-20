import path from 'path';
import fs from 'fs';

const nock = require('nock');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

const fixturesDir = path.join(__dirname, '../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures');

nock('http://testurl-relative-path.com')
  .get('/image-relative-test.png')
  .times(10)
  .replyWithFile(200, path.join(fixturesDir, 'android.jpg'), {
    'Content-Type': 'image/jpeg',
  });

describe('relative dest path resolution', () => {
  it('should resolve a relative dest path to an absolute path based on module directory', async () => {
    // Use a relative path pointing to an existing directory (test/fixtures)
    const relativeDest = './test/fixtures/someurl.com';
    
    const result = await download.image({
      url: 'http://testurl-relative-path.com/image-relative-test.png',
      dest: relativeDest,
    });

    // With original code: path is resolved relative to __dirname of index.js
    // so it becomes an absolute path like /path/to/image-downloader/test/fixtures/someurl.com
    // With mutated code: path stays as relative './test/fixtures/someurl.com/image-relative-test.png'
    expect(path.isAbsolute(result.filename)).toBe(true);
  });
});