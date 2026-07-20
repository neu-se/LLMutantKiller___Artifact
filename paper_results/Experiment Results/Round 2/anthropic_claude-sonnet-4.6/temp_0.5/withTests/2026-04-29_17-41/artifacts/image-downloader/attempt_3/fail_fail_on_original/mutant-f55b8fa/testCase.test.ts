import path from 'path';

const nockLib = require('nock');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

describe('relative dest path handling', () => {
  it('should resolve a relative dest path to an absolute path', async () => {
    nockLib('http://testmutant2.com')
      .get('/image-relative-test.png')
      .replyWithFile(
        200,
        path.join(
          __dirname,
          '../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg'
        ),
        { 'Content-Type': 'image/jpeg' }
      );

    const relativeDest = './tmp';
    const result = await download.image({
      url: 'http://testmutant2.com/image-relative-test.png',
      dest: relativeDest,
    });

    // Original: if (!isAbsolute) → relative path is resolved to absolute → filename is absolute
    // Mutated:  if (isAbsolute)  → relative path is NOT resolved → filename remains relative
    expect(path.isAbsolute(result.filename)).toBe(true);
  });
});