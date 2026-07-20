import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { join } from 'path';

describe('image-downloader', () => {
  it('should resolve relative dest path correctly', async () => {
    const url = 'https://example.com/image.jpg';
    const dest = './images';
    const originalCwd = process.cwd();
    try {
      process.chdir(join(originalCwd, 'images'));
      await expect(image({ url, dest: '../images' })).rejects.toThrowError();
    } finally {
      process.chdir(originalCwd);
    }
  });
});