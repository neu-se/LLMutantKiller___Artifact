import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { join } from 'path';

describe('image-downloader', () => {
  it('should resolve relative dest path correctly', async () => {
    const url = 'https://example.com/image.jpg';
    const dest = './';
    // The original code will throw an error if the dest is '.', because it will be resolved to the current working directory,
    // and then the image function will throw an error because the dest does not have a file name.
    await expect(image({ url, dest: './' })).rejects.toThrowError();
    // The mutated code will not throw an error if the dest is './.', because it will be resolved to the current working directory,
    // and then the image function will not throw an error because the dest is considered absolute.
    await expect(image({ url, dest: './.' })).rejects.toThrowError();
  });
});