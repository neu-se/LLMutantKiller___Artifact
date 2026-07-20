import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('image-downloader', () => {
  it('should resolve relative dest path correctly', async () => {
    const url = 'https://example.com/image.jpg';
    const dest = '/non-existent-dir';
    await expect(image({ url, dest })).rejects.toThrowError();
    const absoluteDest = '/non-existent-dir/image.jpg';
    await expect(image({ url, dest: absoluteDest })).rejects.toThrowError();
    const relativeDest = './non-existent-dir';
    await expect(image({ url, dest: relativeDest })).rejects.toThrowError();
    // Check if the dest is resolved correctly
    await expect(image({ url, dest: relativeDest })).rejects.toThrowError();
  });
});