import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';

describe('path resolution behavior', () => {
  it('should resolve relative destination path to absolute path', async () => {
    const relativeDest = './test-output';
    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: relativeDest,
      extractFilename: false
    };

    const result = await image(options);

    // The original code should resolve the relative path to an absolute path
    expect(path.isAbsolute(result.filename)).toBe(true);
    expect(result.filename).toMatch(/test-output$/);

    // Clean up
    if (fs.existsSync(result.filename)) {
      fs.unlinkSync(result.filename);
    }
  });
});