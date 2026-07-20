import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = './images';
    const options = { url, dest };
    await expect(image(options)).resolves.not.toThrow();
    await expect(image({ url, dest: '/absolute/path' })).resolves.not.toThrow();
    await expect(image({ url, dest: './relative/path' })).resolves.not.toThrow();
  });
});