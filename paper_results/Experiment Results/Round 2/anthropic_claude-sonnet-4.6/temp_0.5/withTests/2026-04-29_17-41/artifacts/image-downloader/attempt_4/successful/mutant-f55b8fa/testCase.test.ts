import path from 'path';
import fs from 'fs';

const nockLib = require('nock');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

describe('relative dest path handling', () => {
  it('should resolve a relative dest path to an absolute path based on __dirname of index.js', async () => {
    nockLib('http://testmutant3.com')
      .get('/image-relative-dest-test.png')
      .replyWithFile(
        200,
        path.join(
          __dirname,
          '../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg'
        ),
        { 'Content-Type': 'image/jpeg' }
      );

    // Use a relative path that exists in the project
    const relativeDest = './test/fixtures';
    const result = await download.image({
      url: 'http://testmutant3.com/image-relative-dest-test.png',
      dest: relativeDest,
    });

    // Original: if (!isAbsolute) → relative path resolved via path.resolve(__dirname, dest) → absolute path
    // Mutated:  if (isAbsolute)  → relative path NOT resolved → stays relative
    expect(path.isAbsolute(result.filename)).toBe(true);
  });
});