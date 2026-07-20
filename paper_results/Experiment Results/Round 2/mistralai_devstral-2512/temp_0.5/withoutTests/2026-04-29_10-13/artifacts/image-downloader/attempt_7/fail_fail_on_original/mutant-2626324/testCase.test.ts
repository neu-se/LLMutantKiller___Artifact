import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should resolve relative destination path to absolute when path is not absolute', async () => {
    const testUrl = 'https://example.com/image.png';
    const relativeDest = './downloads';
    const options = { url: testUrl, dest: relativeDest, extractFilename: true };

    const spy = jest.spyOn(path, 'resolve');
    await expect(image(options)).rejects.toThrow();

    const hasRelativePathCall = spy.mock.calls.some(call =>
      call.length === 2 &&
      call[0] === __dirname &&
      call[1] === path.join(relativeDest, 'image.png')
    );

    expect(hasRelativePathCall).toBe(true);
    spy.mockRestore();
  });
});