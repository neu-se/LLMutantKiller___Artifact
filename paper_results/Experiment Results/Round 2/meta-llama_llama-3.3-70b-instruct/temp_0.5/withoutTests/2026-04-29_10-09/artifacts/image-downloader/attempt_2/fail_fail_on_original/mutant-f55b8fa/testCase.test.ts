import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { URL } from 'url';
import path from 'path';

describe('image downloader', () => {
  it('should resolve relative paths correctly', async () => {
    const url = new URL('https://example.com/image.jpg');
    const dest = './images';
    const options = { url: url.href, dest };

    await expect(image(options)).resolves.not.toThrow();
  });
});