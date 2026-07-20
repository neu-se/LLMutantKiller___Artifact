import { createWriteStream } from 'fs';
import { TimeoutError } from '../../lib/TimeoutError';
import { http, https } = require('follow-redirects');
import { request } from '../../lib/request';

describe('request function', () => {
  it('should handle errors correctly when writing to a file', async () => {
    const url = 'http://example.com';
    const dest = 'test.txt';

    // Create a write stream that will emit an error event
    const writeStream = createWriteStream(dest);
    writeStream.emit('error', new Error('Test error'));

    // Mock the request function to return a response that will pipe to the write stream
    const originalRequest = request;
    jest.mock('../../lib/request', () => ({
      __esModule: true,
      default: ({ url, dest, ...options }) => new Promise((resolve, reject) => {
        const request = url.trimLeft().startsWith('https') ? https : http;

        request
          .get(url, options, (res) => {
            if (res.statusCode !== 200) {
              // Consume response data to free up memory
              res.resume();
              reject(new Error('Request Failed.\n' +
                               `Status Code: ${res.statusCode}`));

              return;
            }

            res.pipe(writeStream)
              .on('error', reject)
              .once('close', () => resolve({ filename: dest }));
          })
          .on('timeout', () => reject(new TimeoutError()))
          .on('error', reject);
      }),
    }));

    // Test the request function with the mocked write stream
    await expect(originalRequest({ url, dest })).rejects.toThrowError(Error);

    // Restore the original request function
    jest.resetModules();
  });
});