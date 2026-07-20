import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = './non-existent-relative-path';
    const options = { url, dest };
    await expect(image(options)).rejects.toThrow();
    const absoluteDest = '/absolute/path';
    const absoluteOptions = { url, dest: absoluteDest };
    await expect(image(absoluteOptions)).rejects.toThrow();
  });
});