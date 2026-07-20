import path from 'path';
import nock from 'nock';
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

describe('dest path resolution', () => {
  it('should not call path.resolve on an already absolute dest path', async () => {
    nock('http://someurl.com')
      .get('/img.png')
      .reply(200, Buffer.from('image data'), { 'Content-Type': 'image/jpeg' });

    const unnormalizedAbsoluteDest = '/tmp/../tmp/img.png';

    const { filename } = await download.image({
      url: 'http://someurl.com/img.png',
      dest: unnormalizedAbsoluteDest,
      extractFilename: false,
    });

    // Original code: path.isAbsolute('/tmp/../tmp/img.png') === true, so !true === false, skip resolve
    // filename stays as '/tmp/../tmp/img.png'
    // Mutated code: if(true) always resolves, path.resolve(__dirname, '/tmp/../tmp/img.png') === '/tmp/img.png'
    // filename becomes '/tmp/img.png'
    expect(filename).toEqual('/tmp/../tmp/img.png');
  });
});