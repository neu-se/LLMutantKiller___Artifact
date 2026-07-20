import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should resolve relative destination path to absolute when path is not absolute', async () => {
    const testUrl = 'https://example.com/image.png';
    const relativeDest = './downloads';
    const expectedDest = path.resolve(__dirname, relativeDest, 'image.png');

    const options = { url: testUrl, dest: relativeDest, extractFilename: true };
    const spy = jest.spyOn(path, 'resolve');

    await expect(image(options)).rejects.toThrow();
    expect(spy).toHaveBeenCalledWith(__dirname, relativeDest, 'image.png');
    spy.mockRestore();
  });
});