import { image } from '../index';
import * as path from 'path';
import * as fs from 'fs';
import nock from 'nock';

describe('image downloader', () => {
  it('should resolve the destination path correctly', async () => {
    const url = 'http://someurl.com/image-success.png';
    const dest = './test/fixtures/image-success.png';
    nock('http://someurl.com')
      .get(/success/)
      .replyWithFile(200, path.join(__dirname, 'image-success.png'), {
        'Content-Type': 'image/png',
      });

    const result = await image({ url, dest });
    expect(result.filename).toBe(path.resolve(process.cwd(), dest));
    expect(() => fs.accessSync(result.filename)).not.toThrow();
  });
});