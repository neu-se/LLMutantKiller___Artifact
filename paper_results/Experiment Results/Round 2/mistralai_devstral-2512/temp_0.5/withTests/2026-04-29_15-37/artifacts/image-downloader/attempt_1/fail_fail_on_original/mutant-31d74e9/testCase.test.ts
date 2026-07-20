import * as fs from 'fs';
import * as path from 'path';
import nock from 'nock';
import { download } from '../index';

describe('download error handling', () => {
  it('should reject with an error when the response stream emits an error event', async () => {
    // Setup a mock server that initially responds with 200 but then emits an error on the stream
    const mockUrl = 'http://test.com/error-stream.jpg';
    const dest = path.join(__dirname, 'test-output.jpg');

    nock('http://test.com')
      .get('/error-stream.jpg')
      .replyWithFile(200, path.join(__dirname, 'fixtures/android.jpg'), {
        'Content-Type': 'image/jpeg',
      })
      .socketDelay(100) // Introduce a delay to simulate network conditions
      .on('stream', (stream) => {
        // Force an error on the stream after a short delay
        setTimeout(() => {
          stream.emit('error', new Error('Stream error'));
        }, 10);
      });

    await expect(download.image({ url: mockUrl, dest }))
      .rejects.toThrow('Stream error');

    // Clean up
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
    }
  });
});