import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { join } from 'path';
import { URL } from 'url';

describe('image-downloader', () => {
  it('should resolve relative dest path correctly', async () => {
    const url = new URL('https://example.com/image.jpg');
    const dest = 'images';
    const expectedDest = join(process.cwd(), 'images', 'image.jpg');
    const actualDest = await image({ url: url.href, dest, extractFilename: true });
    expect(actualDest).rejects.toThrowError();
    const options = { url: url.href, dest, extractFilename: true };
    const requestMock = jest.fn((options) => Promise.resolve(options));
    // @ts-ignore
    const originalRequest = require('../../../../../../../../../../subject_repositories/image-downloader/lib/request');
    // @ts-ignore
    require('../../../../../../../../../../subject_repositories/image-downloader/lib/request').request = requestMock;
    await image(options);
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith(expect.objectContaining({ dest: expectedDest }));
    // @ts-ignore
    require('../../../../../../../../../../subject_repositories/image-downloader/lib/request').request = originalRequest;
  });
});