import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should reject when destination is not absolute and mutation is present', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const relativeDest = './downloads';

    try {
      await image({ url: testUrl, dest: relativeDest });
      // If we get here, the mutation is present (if (false) branch)
      fail('Expected promise to reject but it resolved');
    } catch (error) {
      // In original code, this should reject because path.isAbsolute(relativeDest) is false
      // In mutated code, it won't reject because of the "if (false)" condition
      expect((error as Error).message).toContain('ENOENT');
    }
  });
});