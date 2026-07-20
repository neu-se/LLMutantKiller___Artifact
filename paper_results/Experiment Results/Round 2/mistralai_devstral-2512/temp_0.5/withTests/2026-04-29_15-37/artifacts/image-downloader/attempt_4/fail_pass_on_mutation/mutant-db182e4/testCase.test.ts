import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';

describe('path resolution behavior', () => {
  it('should handle relative paths correctly', async () => {
    const relativeDest = 'test-output';
    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: relativeDest,
      extractFilename: false
    };

    const result = await image(options);

    // In original code: relative paths are resolved to absolute paths
    // In mutated code: path.resolve() is called even on absolute paths, which changes behavior
    expect(path.isAbsolute(result.filename)).toBe(true);

    // Verify the file was actually created
    expect(fs.existsSync(result.filename)).toBe(true);

    // Clean up
    fs.unlinkSync(result.filename);
  });
});