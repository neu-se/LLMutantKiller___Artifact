import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import { join } from 'path';
import { mkdir, rm, access } from 'fs/promises';
import http from 'http';

describe('image downloader', () => {
  it('should resolve relative destination path', async () => {
    const url = 'http://localhost:8080/image.jpg';
    const dest = './image.jpg';

    const server = http.createServer((req, res) => {
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.end('image data');
    });

    server.listen(8080, async () => {
      await image({ url, dest });
      await access(join(process.cwd(), dest)).then(() => {
        expect(true).toBe(true);
      }).catch(() => {
        throw new Error('File not found');
      });
      await rm(join(process.cwd(), dest));
      server.close();
    });
  });
});