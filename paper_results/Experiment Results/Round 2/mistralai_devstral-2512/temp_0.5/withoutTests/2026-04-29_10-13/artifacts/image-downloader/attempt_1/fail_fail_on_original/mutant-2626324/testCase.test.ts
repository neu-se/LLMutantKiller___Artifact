import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from 'path';
import fs from 'fs';
import nock from 'nock';

describe('image downloader', () => {
  it('should resolve relative destination path to absolute', async () => {
    const testUrl = 'https://example.com/image.png';
    const relativeDest = './downloads';
    const expectedAbsoluteDest = path.resolve(__dirname, relativeDest, 'image.png');

    const scope = nock('https://example.com')
      .get('/image.png')
      .reply(200, 'mock image data');

    await image({ url: testUrl, dest: relativeDest });

    expect(fs.existsSync(expectedAbsoluteDest)).toBe(true);
    expect(scope.isDone()).toBe(true);

    fs.unlinkSync(expectedAbsoluteDest);
    fs.rmdirSync(path.dirname(expectedAbsoluteDest));
  });
});