// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/image-downloader/attempt_1/pending_category/mutant-952ac07/testCase.test.ts
import { createWriteStream } from 'fs';
import { TimeoutError } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/TimeoutError";
import { http, https } from 'follow-redirects';

describe('request module error handling', () => {
  it('should reject with an error when the request emits an error event', async () => {
    const mockRequest = {
      get: jest.fn((url, options, callback) => {
        // Simulate an error event being emitted
        setImmediate(() => {
          mockRequest.emit('error', new Error('Network error'));
        });
        return mockRequest;
      }),
      on: jest.fn((event, handler) => {
        if (event === 'error') {
          setImmediate(() => handler(new Error('Network error')));
        }
        return mockRequest;
      }),
      emit: jest.fn(),
    };

    // Mock the http/https module to return our mock request
    jest.spyOn(http, 'get').mockImplementationOnce(mockRequest.get);
    jest.spyOn(https, 'get').mockImplementationOnce(mockRequest.get);

    const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request");

    await expect(request({ url: 'http://example.com/image.jpg', dest: '/tmp/test.jpg' }))
      .rejects.toThrow('Network error');
  });
});