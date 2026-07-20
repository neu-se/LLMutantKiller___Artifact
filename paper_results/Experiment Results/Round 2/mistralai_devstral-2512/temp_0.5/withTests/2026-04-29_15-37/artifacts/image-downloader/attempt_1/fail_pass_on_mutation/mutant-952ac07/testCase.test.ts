import { createWriteStream } from 'fs';
import { TimeoutError } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/TimeoutError";
import { http, https } from 'follow-redirects';

describe('request error handling', () => {
  it('should reject with an error when request fails', (done) => {
    const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request");

    const mockError = new Error('Network error');
    const originalGet = http.get;
    http.get = jest.fn((url, options, callback) => {
      const mockRes = {
        statusCode: 200,
        pipe: jest.fn(() => ({
          on: jest.fn((event, handler) => {
            if (event === 'error') {
              handler(mockError);
            }
            return { once: jest.fn() };
          }),
        })),
        resume: jest.fn(),
      };
      callback(mockRes);
      return {
        on: jest.fn((event, handler) => {
          if (event === 'timeout') {
            handler();
          } else if (event === 'error') {
            handler(mockError);
          }
        }),
      };
    });

    request({ url: 'http://example.com/image.jpg', dest: '/tmp/test.jpg' })
      .then(() => done(new Error('Expected request to fail')))
      .catch((err) => {
        expect(err).toBe(mockError);
        http.get = originalGet;
        done();
      });
  });
});