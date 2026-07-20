import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { URL } from 'url';

describe('image downloader', () => {
  it('should resolve relative paths correctly', async () => {
    const url = new URL('https://example.com/image.jpg');
    const dest = 'images';
    const options = { url: url.href, dest };

    await expect(image(options)).resolves.not.toThrow();

    const absoluteDest = `${dest}/${decodeURIComponent(path.basename(url.pathname))}`;
    expect(absoluteDest).toBe(`${dest}/image.jpg`);
  });
});