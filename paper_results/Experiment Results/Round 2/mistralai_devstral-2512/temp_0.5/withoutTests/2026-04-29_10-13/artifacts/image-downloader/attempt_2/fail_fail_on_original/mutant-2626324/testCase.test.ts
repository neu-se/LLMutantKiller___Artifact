import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should resolve relative destination path to absolute', async () => {
    const testUrl = 'https://example.com/image.png';
    const relativeDest = './downloads';
    const options = { url: testUrl, dest: relativeDest };

    await expect(image(options)).rejects.toThrow();

    const spy = jest.spyOn(path, 'resolve');
    await image(options).catch(() => {});
    expect(spy).toHaveBeenCalledWith(__dirname, relativeDest);
    spy.mockRestore();
  });
});