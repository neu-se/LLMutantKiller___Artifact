import { image } from '../../../../../../../../../../../subject_repositories/image-downloader/index';
import * as fs from 'fs';
import * as path from 'path';

describe('image downloader', () => {
  it('should resolve relative destination path', async () => {
    const dest = './tmp';
    await expect(image({ url: 'http://someurl.com/image.jpg', dest })).rejects.toThrow();
  });
});