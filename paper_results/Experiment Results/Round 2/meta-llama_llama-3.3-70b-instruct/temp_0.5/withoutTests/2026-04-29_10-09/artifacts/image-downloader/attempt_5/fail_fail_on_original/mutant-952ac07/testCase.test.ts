import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';
import { EventEmitter } from 'events';
import http from 'http';

describe('request', () => {
  it('should reject the promise when an error occurs during the request', async () => {
    // Arrange
    const url = 'http://example.com';
    const dest = 'example.txt';
    const options = {};

    // Create a server that sends an error
    const server = http.createServer((req, res) => {
      res.emit('error', new Error('Test error'));
    });
    server.listen(0, () => {
      const port = server.address().port;
      // Act and Assert
      request({ url: `http://localhost:${port}`, dest, ...options })
        .then(() => {
          throw new Error('Expected request to reject');
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(Error);
        })
        .finally(() => {
          server.close();
        });
    });
  });
});