import path from 'path';
import nock from 'nock';

const nockLib = require('nock');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

describe('absolute dest path handling', () => {
  it('should leave an absolute dest path unchanged without prepending __dirname', async () => {
    nockLib('http://testmutant.com')
      .get('/image-test.png')
      .replyWithFile(
        200,
        path.join(
          __dirname,
          '../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg'
        ),
        { 'Content-Type': 'image/jpeg' }
      );

    const absoluteDest = '/tmp/image-test.png';
    const result = await download.image({
      url: 'http://testmutant.com/image-test.png',
      dest: absoluteDest,
    });

    // Original: if (!isAbsolute) → absolute path is left as-is → filename === '/tmp/image-test.png'
    // Mutated:  if (isAbsolute)  → absolute path gets __dirname prepended → filename !== '/tmp/image-test.png'
    expect(result.filename).toEqual(absoluteDest);
  });
});