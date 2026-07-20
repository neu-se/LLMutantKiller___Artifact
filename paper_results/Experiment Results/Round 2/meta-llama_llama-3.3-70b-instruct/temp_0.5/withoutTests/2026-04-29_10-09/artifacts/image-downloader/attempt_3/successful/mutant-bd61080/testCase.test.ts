import { join } from 'path';
import { readFileSync } from 'fs';
import request from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js";
import { createServer, IncomingMessage, ServerResponse } from 'http';

describe('request', () => {
  it('should reject with a meaningful error message when the status code is not 200', async () => {
    const url = 'http://localhost:8081';
    const dest = join(__dirname, 'test.txt');

    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
      res.statusCode = 404;
      res.end('Not Found');
    }).listen(8081);

    try {
      await request({ url, dest });
      throw new Error('Expected request to reject');
    } catch (error) {
      expect(error.message).toContain('Status Code: 404');
    } finally {
      server.close();

      // Clean up
      const fs = require('fs');
      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
      }
    }
  });
});