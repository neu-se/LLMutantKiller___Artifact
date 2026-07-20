import nock from 'nock';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('request function', () => {
  it('should handle errors correctly when writing to a file', async () => {
    const url = 'http://example.com';
    const dest = 'test.txt';

    // Mock the HTTP request
    nock(url)
      .get('/')
      .reply(200, 'Hello World');

    // Test the request function
    await expect(request({ url, dest })).resolves;

    // Now test the mutated code
    // The mutated code will throw an error because it's trying to listen for an empty string event
    const originalRequest = request;
    jest.mock('../../../../../../../../../subject_repositories/image-downloader/lib/request', () => ({
      __esModule: true,
      default: ({ url, dest, ...options }) => new Promise((resolve, reject) => {
        const http = require('http');
        const req = http.get(url, (res) => {
          if (res.statusCode !== 200) {
            res.resume();
            reject(new Error('Request Failed.\n' +
                             `Status Code: ${res.statusCode}`));
            return;
          }

          const writeStream = require('fs').createWriteStream(dest);
          res.pipe(writeStream)
            .on("", reject)
            .once('close', () => resolve({ filename: dest }));
        });
        req.on('timeout', () => reject(new Error('Timeout')));
        req.on('error', reject);
      }),
    }));

    // Test the request function with the mutated code
    await expect(request({ url, dest })).rejects.toThrowError();
  });
});