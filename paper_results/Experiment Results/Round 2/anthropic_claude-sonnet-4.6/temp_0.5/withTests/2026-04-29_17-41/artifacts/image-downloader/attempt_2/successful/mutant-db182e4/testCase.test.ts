const path = require('path');
const nock = require('nock');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

const fixturesPath = path.join(__dirname, '../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg');

nock('http://someurl.com')
  .get('/image-success.png')
  .replyWithFile(200, fixturesPath, {
    'Content-Type': 'image/jpeg',
  });

describe('path.isAbsolute mutation detection', () => {
  it('should not normalize an already absolute dest path that contains ".." segments', async () => {
    // Use an absolute path with ".." segments
    // Original: since dest is already absolute, path.resolve is NOT called, so dest stays as-is
    // Mutated: path.resolve IS always called, normalizing '/tmp/../tmp/image-success.png' to '/tmp/image-success.png'
    const unnormalizedDest = '/tmp/../tmp/image-success.png';
    
    const result = await download.image({
      url: 'http://someurl.com/image-success.png',
      dest: unnormalizedDest,
      extractFilename: false,
    });
    
    // Original code: dest is absolute, so path.resolve is NOT applied, filename stays unnormalized
    // Mutated code: path.resolve is always applied, normalizing to '/tmp/image-success.png'
    expect(result.filename).toEqual('/tmp/../tmp/image-success.png');
  }, 10000);
});