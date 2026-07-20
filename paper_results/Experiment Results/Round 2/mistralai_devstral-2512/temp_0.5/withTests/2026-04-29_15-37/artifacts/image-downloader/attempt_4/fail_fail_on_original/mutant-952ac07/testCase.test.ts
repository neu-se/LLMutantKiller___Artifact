import * as fs from 'fs';
import * as path from 'path';

describe('request error handling', () => {
  it('should handle request errors properly', (done) => {
    const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request");
    const originalHttp = require('follow-redirects').http;

    // Mock the http module to simulate an error event
    const mockHttp = {
      get: jest.fn((url, options, callback) => {
        const mockRes = {
          statusCode: 200,
          pipe: jest.fn(() => ({
            on: jest.fn(() => ({
              once: jest.fn()
            })),
            once: jest.fn()
          })),
          resume: jest.fn()
        };
        callback(mockRes);

        // Return a mock request object that will emit an error
        return {
          on: jest.fn((event, handler) => {
            if (event === 'error') {
              setTimeout(() => handler(new Error('Request failed')), 0);
            }
            return this;
          }),
          once: jest.fn()
        };
      })
    };

    // Replace the http module temporarily
    require('follow-redirects').http = mockHttp;

    request({ url: 'http://example.com/image.jpg', dest: path.join(__dirname, 'test.jpg') })
      .then(() => {
        require('follow-redirects').http = originalHttp;
        done(new Error('Expected request to fail'));
      })
      .catch((err: Error) => {
        expect(err.message).toBe('Request failed');
        require('follow-redirects').http = originalHttp;
        done();
      });
  });
});