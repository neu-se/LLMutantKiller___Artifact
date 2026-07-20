import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';

describe('path resolution behavior', () => {
  it('should preserve absolute paths exactly as provided', async () => {
    const testDir = path.join(__dirname, 'test-output');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    const absoluteDest = path.join(testDir, 'test-image.png');
    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: absoluteDest,
      extractFilename: false
    };

    const result = await image(options);

    // In original code: absolute paths remain unchanged
    // In mutated code: path.resolve() is called on all paths, which will modify absolute paths
    // by prepending the current working directory
    expect(result.filename).toBe(absoluteDest);

    // Verify the file exists at the exact expected location
    expect(fs.existsSync(result.filename)).toBe(true);

    // Additional check: verify the path wasn't modified by path.resolve()
    expect(result.filename).not.toContain(process.cwd());

    // Clean up
    fs.unlinkSync(result.filename);
    fs.rmdirSync(testDir);
  });
});