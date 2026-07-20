import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = './images';
    const options = { url, dest };
    try {
      await image(options);
    } catch (error) {
      expect(error).toBeUndefined();
    }
    // If the mutation is present, the test will fail because the destination path
    // will not be resolved correctly, causing the request to fail.
  });
});