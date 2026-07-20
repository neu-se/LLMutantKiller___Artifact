import { request } from './lib/request';
import { createWriteStream, existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { createServer } from 'http';
import { AddressInfo } from 'net';

describe('request module error handling', () => {
  it('should handle pipe errors correctly', async () => {
    const dest = join(__dirname, 'test-download.txt');
    let server: ReturnType<typeof createServer>;
    let serverUrl: string;

    try {
      server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('test data');
        res.destroy(); // Force an error during pipe
      });

      server.listen(0);
      const address = server.address() as AddressInfo;
      serverUrl = `http://localhost:${address.port}`;

      await expect(request({ url: serverUrl, dest })).rejects.toThrow();
    } finally {
      if (existsSync(dest)) {
        unlinkSync(dest);
      }
      if (server) {
        server.close();
      }
    }
  });
});