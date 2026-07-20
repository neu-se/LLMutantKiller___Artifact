import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { join } from 'path';
import { mkdir, rm, access } from 'fs/promises';
import nock from 'nock';

describe('image downloader', () => {
  it('should resolve relative destination path', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = 'image.jpg';

    nock('http://example.com')
      .get('/image.jpg')
      .reply(200, 'image data');

    await mkdir(join(process.cwd(), 'temp'), { recursive: true });
    await image({ url, dest: join('temp', dest) });
    await access(join(process.cwd(), 'temp', dest)).then(() => {
      expect(true).toBe(true);
    }).catch(() => {
      throw new Error('File not found');
    });
    await rm(join(process.cwd(), 'temp', dest));
    await rm(join(process.cwd(), 'temp'), { recursive: true });
  });
});