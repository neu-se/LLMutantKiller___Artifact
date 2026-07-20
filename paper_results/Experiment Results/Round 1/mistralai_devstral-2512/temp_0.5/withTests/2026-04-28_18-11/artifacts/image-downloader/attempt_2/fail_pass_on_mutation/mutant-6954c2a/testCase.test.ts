import { createWriteStream } from 'fs';
import { http } from 'follow-redirects';

describe('request error message format', () => {
  it('should include status code in error message for non-200 responses', (done) => {
    const mockRequest = {
      get: (url: string, options: any, callback: Function) => {
        const mockResponse = {
          statusCode: 404,
          resume: () => {},
          pipe: () => mockResponse
        };
        callback(mockResponse);
        return mockRequest;
      },
      on: () => mockRequest
    };

    const originalHttp = http;
    (http as any) = mockRequest;

    const requestModule = require('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js');

    requestModule({ url: 'http://example.com/image.jpg', dest: '/tmp/test.jpg' })
      .then(() => done(new Error('Should have rejected')))
      .catch((err: Error) => {
        expect(err.message).toContain('Status Code: 404');
        (http as any) = originalHttp;
        done();
      });
  });
});