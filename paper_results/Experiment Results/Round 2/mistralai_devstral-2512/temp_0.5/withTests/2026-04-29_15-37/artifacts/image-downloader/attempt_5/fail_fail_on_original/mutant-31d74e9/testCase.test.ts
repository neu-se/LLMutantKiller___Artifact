import * as fs from 'fs';
import * as path from 'path';
import nock from 'nock';
import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/index';

describe('download error handling', () => {
  it('should reject with an error when the response stream emits an error event', async () => {
    const mockUrl = 'http://test.com/error-stream.jpg';
    const dest = path.join(__dirname, 'test-output.jpg');

    // Setup a mock server that initially responds with 200 but then emits an error on the stream
    nock('http://test.com')
      .get('/error-stream.jpg')
      .replyWithFile(200, path.join(__dirname, 'fixtures/android.jpg'), {
        'Content-Type': 'image/jpeg',
      })
      .socketDelay(100)
      .on('stream', (stream) => {
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