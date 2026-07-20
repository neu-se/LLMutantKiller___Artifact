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

    // The mutation changes the condition from `!path.isAbsolute(options.dest)` to `if (true)`
    // This means relative paths will always be resolved, even when they shouldn't be
    // We test that the path is correctly resolved to an absolute path
    expect(path.isAbsolute(result.filename)).toBe(true);

    // Clean up
    if (fs.existsSync(result.filename)) {
      fs.unlinkSync(result.filename);
    }
  });
});