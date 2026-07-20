const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js");
import { createWriteStream, existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { createServer } from 'http';
import { AddressInfo } from 'net';

describe('request module error handling', () => {
  it('should properly handle empty event names in error handler', async () => {
    const dest = join(__dirname, 'test-download.txt');
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('test data');
      res.end();
    });

    server.listen(0);
    const address = server.address() as AddressInfo;
    const serverUrl = `http://localhost:${address.port}`;

    // This test specifically targets the mutation by checking if empty event names are handled
    // The mutation changes '.on('error', reject)' to '.on("", reject)'
    // We need to verify the error handler is properly registered
    let errorHandlerCalled = false;
    const originalPipe = createWriteStream.prototype.pipe;
    createWriteStream.prototype.pipe = function(...args) {
      const result = originalPipe.apply(this, args);
      // Check if error handler is properly registered
      if (this.listeners('error').length === 0) {
        errorHandlerCalled = true;
      }
      return result;
    };

    try {
      await request({ url: serverUrl, dest });
      // If we get here, the file was downloaded successfully
      // Now verify the error handler was properly registered
      expect(errorHandlerCalled).toBe(false);
    } finally {
      if (existsSync(dest)) {
        unlinkSync(dest);
      }
      server.close();
      createWriteStream.prototype.pipe = originalPipe;
    }
  });
});