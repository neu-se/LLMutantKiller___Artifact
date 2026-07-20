import path from 'path';
import nock from 'nock';
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

describe('dest path resolution', () => {
  it('relative dest should resolve relative to index.js __dirname, not test __dirname', async () => {
    const relativeDest = 'test/fixtures/someurl.com';
    const expectedFilename = path.resolve(path.dirname(require.resolve('../../../../../../../../../../../subject_repositories/image-downloader/index.js')), relativeDest);

    nock('http://someurl.com')
      .get('/image-success.png')
      .reply(200, Buffer.from('fake image data'), { 'Content-Type': 'image/jpeg' });

    const { filename } = await download.image({
      url: 'http://someurl.com/image-success.png',
      dest: relativeDest,
    });

    expect(filename).toEqual(expectedFilename);
  });
});