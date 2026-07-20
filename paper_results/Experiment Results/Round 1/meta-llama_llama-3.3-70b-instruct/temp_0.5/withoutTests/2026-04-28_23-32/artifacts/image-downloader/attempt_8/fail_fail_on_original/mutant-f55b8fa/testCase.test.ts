import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = '/absolute/path';
    const options = { url, dest };
    await expect(image(options)).resolves.not.toThrow();
    const relativeOptions = { url, dest: './relative/path' };
    await expect(image(relativeOptions)).resolves.not.toThrow();
  });
});