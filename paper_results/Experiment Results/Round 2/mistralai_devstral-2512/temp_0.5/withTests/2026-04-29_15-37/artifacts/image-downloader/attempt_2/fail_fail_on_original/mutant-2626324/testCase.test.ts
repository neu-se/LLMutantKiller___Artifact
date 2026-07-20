const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');
const path = require('path');
const fs = require('fs');

describe('path resolution behavior', () => {
  it('should resolve relative destination path to absolute path', async () => {
    const relativeDest = './test/output';
    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: relativeDest,
      extractFilename: true
    };

    const result = await download.image(options);

    // Verify the destination was converted to an absolute path
    expect(path.isAbsolute(result.filename)).toBe(true);
    // Verify the file was actually saved to the resolved path
    expect(fs.existsSync(result.filename)).toBe(true);
    // Verify the filename contains the expected basename
    expect(result.filename).toMatch(/image-success\.png$/);
  });
});