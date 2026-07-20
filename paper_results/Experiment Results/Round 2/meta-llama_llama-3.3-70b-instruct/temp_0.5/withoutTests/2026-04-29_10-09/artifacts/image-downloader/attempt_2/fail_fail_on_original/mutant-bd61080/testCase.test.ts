import { join } from 'path';
import { readFileSync } from 'fs';
import { Something } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js";
import { createServer, IncomingMessage, ServerResponse } from 'http';

describe('request', () => {
  it('should reject with a meaningful error message when the status code is not 200', async () => {
    const url = 'http://localhost:8080';
    const dest = join(__dirname, 'test.txt');

    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
      res.statusCode = 404;
      res.end('Not Found');
    }).listen(8080);

    await expect(Something({ url, dest })).rejects.toThrowError(
      expect.objectContaining({
        message: expect.stringContaining('Status Code: 404'),
      }),
    );

    server.close();

    // Clean up
    const fs = require('fs');
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
    }
  });
});