import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';

describe('path resolution behavior', () => {
  it('should not modify already absolute destination paths', async () => {
    const absoluteDest = '/tmp/test-output';
    const options = {
      url: 'http://someurl.com/image-success.png',
      dest: absoluteDest,
      extractFilename: false
    };

    const result = await image(options);

    // In the original code, absolute paths are not modified
    // In the mutated code, the condition is always true, so even absolute paths get resolved
    // This will cause the path to be modified when it shouldn't be
    expect(result.filename).toBe(absoluteDest);

    // Clean up
    if (fs.existsSync(result.filename)) {
      fs.unlinkSync(result.filename);
    }
  });
});