import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('image-downloader', () => {
  it('should resolve relative dest path correctly', async () => {
    const url = 'https://example.com/image.jpg';
    const dest = __dirname;
    // The original code will throw an error if the dest is a directory, 
    // because it will be resolved to the directory path, and then the image function will throw an error because the dest does not have a file name.
    await expect(image({ url, dest })).rejects.toThrowError();
    // The mutated code will not throw an error if the dest is a directory, 
    // because it will always resolve the dest to an absolute path, 
    // so it will not check if the dest is a directory or a file.
    await expect(image({ url, dest: __dirname + '/' })).rejects.not.toThrowError();
  });
});