import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';

describe('image downloader', () => {
  it('should resolve relative destination path when not absolute', async () => {
    const testUrl = 'https://example.com/image.png';
    const relativeDest = './downloads';
    const options = { url: testUrl, dest: relativeDest, extractFilename: true };

    const spy = jest.spyOn(path, 'resolve');
    await expect(image(options)).rejects.toThrow();

    const resolveCalls = spy.mock.calls.filter(call => call.length === 2);
    expect(resolveCalls.length).toBeGreaterThan(0);
    expect(resolveCalls.some(call => !path.isAbsolute(call[1]))).toBe(true);

    spy.mockRestore();
  });
});