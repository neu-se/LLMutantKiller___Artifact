import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';

describe('image downloader', () => {
  it('should properly handle relative destination paths', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './test-downloads';

    // Create a temporary directory for testing
    const tempDir = path.join(__dirname, relativeDest);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    try {
      // This should work in original code because path.isAbsolute will be checked
      // In mutated code, this will fail because the path resolution won't happen
      await expect(image({ url: testUrl, dest: relativeDest })).resolves.not.toThrow();

      // Verify the file was created in the expected location
      const expectedPath = path.join(tempDir, 'image.jpg');
      expect(fs.existsSync(expectedPath)).toBe(true);
    } finally {
      // Clean up
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});