import { image } from '../../index';
import * as fs from 'fs';
import * as path from 'path';

describe('image downloader', () => {
  it('should resolve relative destination path', async () => {
    const dest = './tmp/image.jpg';
    await image({ url: 'http://someurl.com/image.jpg', dest: './tmp/image.jpg' });
    expect(() => fs.accessSync(path.resolve(__dirname, dest))).not.toThrow();
  });
});