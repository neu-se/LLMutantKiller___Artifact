import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('request function', () => {
  it('should handle errors correctly when writing to a file', async () => {
    const url = 'http://example.com';
    const dest = 'test.txt';

    // Create a write stream that will emit an error event
    const fs = require('fs');
    const writeStream = fs.createWriteStream(dest);
    writeStream.emit = jest.fn();

    // Mock the request function to return a response that will pipe to the write stream
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

          res.pipe(writeStream)
            .on('error', reject)
            .once('close', () => resolve({ filename: dest }));
        });
        req.on('timeout', () => reject(new Error('Timeout')));
        req.on('error', reject);
      }),
    }));

    // Test the request function with the mocked write stream
    await expect(originalRequest({ url, dest })).rejects.toThrowError();

    // Restore the original request function
    jest.resetModules();

    // Now test the mutated code
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

          res.pipe(writeStream)
            .on("", reject)
            .once('close', () => resolve({ filename: dest }));
        });
        req.on('timeout', () => reject(new Error('Timeout')));
        req.on('error', reject);
      }),
    }));

    // Test the request function with the mutated code
    await expect(originalRequest({ url, dest })).rejects.toThrowError();
  });
});