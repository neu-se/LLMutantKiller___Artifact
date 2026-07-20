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
      // Immediately destroy the response to trigger a pipe error
      res.destroy(new Error('Simulated pipe error'));
    });

    server.listen(0);
    const address = server.address() as AddressInfo;
    const serverUrl = `http://localhost:${address.port}`;

    try {
      await request({ url: serverUrl, dest });
      throw new Error('Expected request to reject but it resolved');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Simulated pipe error');
    } finally {
      if (existsSync(dest)) {
        unlinkSync(dest);
      }
      server.close();
    }
  });
});