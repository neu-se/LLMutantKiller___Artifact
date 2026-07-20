import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';

describe('path resolution behavior', () => {
  it('should preserve the exact absolute path when provided', async () => {
    const absoluteDest = '/absolute/test/path';
    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: absoluteDest,
      extractFilename: false
    };

    const result = await image(options);

    // In original code: absolute paths are preserved exactly
    // In mutated code: path.resolve() is called on absolute paths, which may change them
    // (e.g., /absolute/test/path might become /project-dir/absolute/test/path)
    expect(result.filename).toBe(absoluteDest);

    // Verify the file was actually created at the expected location
    expect(fs.existsSync(result.filename)).toBe(true);

    // Clean up
    fs.unlinkSync(result.filename);
  });
});