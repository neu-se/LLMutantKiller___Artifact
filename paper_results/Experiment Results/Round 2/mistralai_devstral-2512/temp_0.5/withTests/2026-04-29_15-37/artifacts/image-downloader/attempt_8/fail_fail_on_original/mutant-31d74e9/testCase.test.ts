import * as fs from 'fs';
import * as path from 'path';
import { createWriteStream } from 'fs';
import requestModule from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';

describe('request error handling', () => {
  it('should handle stream errors correctly', async () => {
    const mockUrl = 'http://example.com/image.jpg';
    const dest = path.join(__dirname, 'test-output.jpg');

    // Create a mock response that will emit an error on the pipe
    const mockResponse = {
      statusCode: 200,
      pipe: jest.fn().mockImplementation((stream) => {
        setTimeout(() => {
          stream.emit('error', new Error('Pipe error'));
        }, 0);
        return mockResponse;
      }),
      once: jest.fn().mockImplementation((event, handler) => {
        if (event === 'close') {
          return mockResponse;
        }
        return mockResponse;
      }),
      on: jest.fn().mockImplementation((event, handler) => {
        if (event === 'error') {
          return mockResponse;
        }
        return mockResponse;
      }),
    };

    // Create a mock request that returns our mock response
    const mockRequest = {
      get: jest.fn().mockImplementation((url, options, callback) => {
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

    const request = requestModule as unknown as typeof mockRequest;
    await expect(request.get(mockUrl, {}, jest.fn())).rejects.toThrow('Pipe error');

    // Clean up
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
    }
  });
});