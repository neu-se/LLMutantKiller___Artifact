import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';

describe('path resolution behavior', () => {
  it('should not modify absolute paths when they are already absolute', async () => {
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
    expect(result.filename).not.toBe(path.resolve(process.cwd(), absoluteDest));

    // Clean up
    fs.unlinkSync(result.filename);
    fs.rmdirSync(testDir);
  });
});