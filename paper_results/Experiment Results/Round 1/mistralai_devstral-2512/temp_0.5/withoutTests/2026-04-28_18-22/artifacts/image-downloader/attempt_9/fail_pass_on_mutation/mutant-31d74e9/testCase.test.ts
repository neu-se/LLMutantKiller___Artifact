const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js");
import { createWriteStream, existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { createServer } from 'http';
import { AddressInfo } from 'net';

describe('request module error handling', () => {
  it('should reject when stream emits error during pipe', async () => {
    const dest = join(__dirname, 'test-download.txt');
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('test data');
      // Force an error during pipe by destroying the socket
      res.socket.destroy();
    });

    server.listen(0);
    const address = server.address() as AddressInfo;
    const serverUrl = `http://localhost:${address.port}`;

    try {
      await request({ url: serverUrl, dest });
      // If we reach here, the promise resolved when it should have rejected
      throw new Error('Expected request to reject but it resolved');
    } catch (error) {
      // Should catch the error from the stream
      expect((error as Error).message).toMatch(/socket hang up|ECONNRESET|Request Failed/);
    } finally {
      if (existsSync(dest)) {
        unlinkSync(dest);
      }
      server.close();
    }
  });
});