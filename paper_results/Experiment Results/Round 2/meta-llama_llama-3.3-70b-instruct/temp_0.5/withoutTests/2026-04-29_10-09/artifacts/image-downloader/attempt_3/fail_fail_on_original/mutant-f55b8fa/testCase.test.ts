import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';

describe('image downloader', () => {
  it('should resolve relative paths correctly', async () => {
    const url = 'https://picsum.photos/200/300';
    const dest = './test-image.jpg';
    const options = { url, dest };

    await image(options);
    expect(fs.existsSync(dest)).toBe(true);
    fs.unlinkSync(dest);
  });
});