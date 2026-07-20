import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';

describe('path resolution behavior', () => {
  it('should not modify absolute paths when extractFilename is true', async () => {
    const testDir = path.join(__dirname, 'test-output');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    const absoluteDest = path.join(testDir, 'test-image');
    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: absoluteDest,
      extractFilename: true
    };

    const result = await image(options);

    // In original code: absolute paths with extractFilename=true should still be preserved
    // In mutated code: path.resolve() is called on all paths, which will modify the path
    expect(result.filename).toBe(path.join(absoluteDest, 'image success.png'));

    // Verify the file exists
    expect(fs.existsSync(result.filename)).toBe(true);

    // Clean up
    fs.unlinkSync(result.filename);
    fs.rmdirSync(testDir);
  });
});