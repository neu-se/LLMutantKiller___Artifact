import * as fs from 'fs';
import * as path from 'path';

interface MockRequest {
  on: (event: string, handler: Function) => MockRequest;
  once: (event: string, handler: Function) => MockRequest;
}

describe('request error handling', () => {
  it('should handle request errors properly', (done) => {
    const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request");
    const originalHttp = require('follow-redirects').http;
    const testFile = path.join(__dirname, 'test.jpg');

    // Mock the http module to simulate an error event
    const mockHttp = {
      get: jest.fn((url, options, callback) => {
        // Don't call callback to simulate a request error
        const mockReq: MockRequest = {
          on: jest.fn((event: string, handler: Function) => {
            if (event === 'error') {
              setTimeout(() => handler(new Error('Request failed')), 0);
            }
            return mockReq;
          }),
          once: jest.fn((event: string, handler: Function) => {
            return mockReq;
          })
        };
        return mockReq;
      })
    };

    require('follow-redirects').http = mockHttp;

    request({ url: 'http://example.com/image.jpg', dest: testFile })
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