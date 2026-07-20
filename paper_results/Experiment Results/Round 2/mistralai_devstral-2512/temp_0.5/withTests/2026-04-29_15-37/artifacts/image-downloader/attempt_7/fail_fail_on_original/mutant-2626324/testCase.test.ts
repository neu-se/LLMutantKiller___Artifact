const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');
const path = require('path');
const fs = require('fs');
const os = require('os');

describe('path resolution behavior', () => {
  it('should resolve relative destination path to absolute path', async () => {
    // Create a temporary directory for testing
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'image-downloader-test-'));
    const relativeDest = './output';
    const absoluteDest = path.join(tempDir, 'output');

    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: relativeDest,
      extractFilename: true
    };

    try {
      const result = await download.image(options);

      // Verify the destination was converted to an absolute path
      expect(path.isAbsolute(result.filename)).toBe(true);
      // Verify the filename contains the expected basename
      expect(result.filename).toMatch(/image-success\.png$/);
      // Verify the file was actually created
      expect(fs.existsSync(result.filename)).toBe(true);
    } finally {
      // Clean up
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});