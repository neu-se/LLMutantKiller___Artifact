import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';

describe('image downloader', () => {
  it('should resolve relative paths correctly', async () => {
    const url = 'https://picsum.photos/200/300';
    const dest = '/absolute/path/test-image.jpg';
    const options = { url, dest };

    await expect(image(options)).rejects.toThrowError('The options.dest is required');
  });
});