import { createWriteStream } from 'fs';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';

describe('request error handling', () => {
  it('should handle stream errors correctly', async () => {
    const mockUrl = 'http://example.com/image.jpg';
    const dest = '/tmp/test-image.jpg';

    // Create a mock request that emits an error event
    const mockRequest = {
      get: jest.fn().mockImplementation((url, options, callback) => {
        const mockResponse = {
          statusCode: 200,
          pipe: jest.fn().mockReturnThis(),
          once: jest.fn().mockImplementation((event, handler) => {
            if (event === 'close') {
              return mockResponse;
            }
            return mockResponse;
          }),
          on: jest.fn().mockImplementation((event, handler) => {
            if (event === 'error') {
              setTimeout(() => handler(new Error('Stream error')), 0);
            }
            return mockResponse;
          }),
        };
        setTimeout(() => callback(mockResponse), 0);
        return {
          on: jest.fn().mockImplementation((event, handler) => {
            if (event === 'timeout') {
              return { on: jest.fn() };
            }
            if (event === 'error') {
              return { on: jest.fn() };
            }
            return { on: jest.fn() };
          }),
        };
      }),
    };

    // Replace the actual request module with our mock
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js', () => mockRequest);

    await expect(request({ url: mockUrl, dest })).rejects.toThrow('Stream error');
  });
});