import { createWriteStream } from 'fs';
import { TimeoutError } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/TimeoutError";
import { http, https } from 'follow-redirects';

describe('request error handling', () => {
  it('should reject with error when request emits error event', (done) => {
    const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request");

    // Mock the http module to simulate an error event
    const originalGet = http.get;
    http.get = jest.fn((url, options, callback) => {
      const mockRes = {
        statusCode: 200,
        pipe: jest.fn(() => ({
          on: jest.fn(),
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
    });

    request({ url: 'http://example.com/image.jpg', dest: '/tmp/test.jpg' })
      .then(() => {
        http.get = originalGet;
        done(new Error('Expected request to fail'));
      })
      .catch((err) => {
        expect(err.message).toBe('Request failed');
        http.get = originalGet;
        done();
      });
  });
});