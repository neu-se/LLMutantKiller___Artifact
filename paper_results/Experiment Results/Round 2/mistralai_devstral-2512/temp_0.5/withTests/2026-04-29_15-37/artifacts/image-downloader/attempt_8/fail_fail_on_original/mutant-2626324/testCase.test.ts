const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');
const path = require('path');

describe('path resolution behavior', () => {
  it('should resolve relative destination path to absolute path', async () => {
    const relativeDest = './output';
    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: relativeDest,
      extractFilename: true
    };

    const result = await download.image(options);

    // Verify the destination was converted to an absolute path
    expect(path.isAbsolute(result.filename)).toBe(true);
    // Verify the filename ends with the expected path
    expect(result.filename).toMatch(/output[\\/]image-success\.png$/);
  });
});