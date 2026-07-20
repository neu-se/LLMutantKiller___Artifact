const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js");
import { createWriteStream, existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { createServer } from 'http';
import { AddressInfo } from 'net';

describe('request module error handling', () => {
  it('should properly handle stream error events during pipe', async () => {
    const dest = join(__dirname, 'test-download.txt');
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('test data');
      res.destroy(); // Force an error during pipe
    });

    server.listen(0);
    const address = server.address() as AddressInfo;
    const serverUrl = `http://localhost:${address.port}`;

    let errorOccurred = false;
    try {
      await request({ url: serverUrl, dest });
    } catch (error) {
      errorOccurred = true;
    } finally {
      if (existsSync(dest)) {
        unlinkSync(dest);
      }
      server.close();
    }

    expect(errorOccurred).toBe(true);
  });
});