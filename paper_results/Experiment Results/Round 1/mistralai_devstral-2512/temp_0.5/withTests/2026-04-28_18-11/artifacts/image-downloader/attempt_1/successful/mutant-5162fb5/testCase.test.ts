import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';

describe('path resolution behavior', () => {
  it('should resolve relative destination path to absolute path', async () => {
    const relativeDest = './test/output';
    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: relativeDest,
      extractFilename: false
    };

    const result = await image(options);

    // The mutation changes the condition from `if (!path.isAbsolute(options.dest))` to `if (false)`
    // This means relative paths won't be resolved to absolute paths in the mutated version
    // We can detect this by checking if the result filename is absolute
    expect(path.isAbsolute(result.filename)).toBe(true);

    // Clean up
    if (fs.existsSync(result.filename)) {
      fs.unlinkSync(result.filename);
    }
  });
});