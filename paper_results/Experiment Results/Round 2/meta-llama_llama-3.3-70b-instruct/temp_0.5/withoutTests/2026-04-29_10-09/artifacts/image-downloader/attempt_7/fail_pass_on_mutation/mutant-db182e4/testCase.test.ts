import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('image-downloader', () => {
  it('should resolve relative dest path correctly', async () => {
    const url = 'https://example.com/image.jpg';
    const dest = './';
    await expect(image({ url, dest })).rejects.toThrowError();
    // The mutated code will always resolve the dest to an absolute path,
    // so it will not throw an error when the dest is already absolute.
    // But in the original code, if the dest is '.', it will be resolved to the current working directory,
    // and then the image function will throw an error because the dest does not have a file name.
    // In the mutated code, if the dest is '.', it will be resolved to the current working directory,
    // and then the image function will not throw an error because the dest is considered absolute.
    await expect(image({ url, dest: '.' })).rejects.toThrowError();
  });
});