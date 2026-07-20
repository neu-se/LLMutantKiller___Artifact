import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { join } from 'path';
import { mkdir, rm } from 'fs/promises';

describe('image downloader', () => {
  it('should resolve relative destination path', async () => {
    const url = 'http://example.com/image.jpg';
    const dest = 'image.jpg';
    const absoluteDest = join(process.cwd(), dest);

    await mkdir(join(process.cwd(), 'temp'), { recursive: true });
    await image({ url, dest: join('temp', dest) });
    await rm(join(process.cwd(), 'temp', dest));
    await rm(join(process.cwd(), 'temp'), { recursive: true });
  });
});