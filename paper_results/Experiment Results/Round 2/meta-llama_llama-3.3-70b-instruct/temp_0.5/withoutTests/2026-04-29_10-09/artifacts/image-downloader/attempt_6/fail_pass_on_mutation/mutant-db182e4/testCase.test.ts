import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { join } from 'path';

describe('image-downloader', () => {
  it('should resolve relative dest path correctly', async () => {
    const url = 'https://example.com/image.jpg';
    const dest = './images';
    const absoluteDest = join(process.cwd(), dest);
    await expect(image({ url, dest })).rejects.toThrowError();
    await expect(image({ url, dest: absoluteDest })).rejects.toThrowError();
    // The mutated code will always resolve the dest to an absolute path,
    // so it will not throw an error when the dest is already absolute.
    await expect(image({ url, dest: absoluteDest })).rejects.toThrowError();
  });
});