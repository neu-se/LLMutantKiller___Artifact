const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js");
import { createWriteStream, existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { createServer } from 'http';
import { AddressInfo } from 'net';

describe('request module error handling', () => {
  it('should properly register error handler on stream', async () => {
    const dest = join(__dirname, 'test-download.txt');
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('test data');
      // Trigger an error by destroying the response
      res.destroy(new Error('Test error'));
    });

    server.listen(0);
    const address = server.address() as AddressInfo;
    const serverUrl = `http://localhost:${address.port}`;

    // Spy on the stream's on method to verify error handler registration
    const originalOn = createWriteStream.prototype.on;
    let errorHandlerRegistered = false;
    createWriteStream.prototype.on = function(event: string, handler: Function) {
      if (event === 'error') {
        errorHandlerRegistered = true;
      }
      return originalOn.call(this, event, handler);
    };

    try {
      await request({ url: serverUrl, dest });
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      // Verify error handler was registered
      expect(errorHandlerRegistered).toBe(true);
      // Verify we got the expected error
      expect((error as Error).message).toContain('Test error');
    } finally {
      if (existsSync(dest)) {
        unlinkSync(dest);
      }
      server.close();
      createWriteStream.prototype.on = originalOn;
    }
  });
});