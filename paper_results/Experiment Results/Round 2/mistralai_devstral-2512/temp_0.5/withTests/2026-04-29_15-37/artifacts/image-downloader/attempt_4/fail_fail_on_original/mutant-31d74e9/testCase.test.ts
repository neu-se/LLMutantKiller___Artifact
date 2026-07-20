import * as fs from 'fs';
import * as path from 'path';
import { createWriteStream } from 'fs';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';

describe('request error handling', () => {
  it('should handle stream errors correctly', async () => {
    const mockUrl = 'http://example.com/image.jpg';
    const dest = path.join(__dirname, 'test-output.jpg');

    // Create a writable stream that will emit an error
    const mockWriteStream = {
      on: jest.fn().mockImplementation((event, handler) => {
        if (event === 'error') {
          setTimeout(() => handler(new Error('Write stream error')), 0);
        }
        return mockWriteStream;
      }),
      once: jest.fn().mockImplementation((event, handler) => {
        if (event === 'close') {
          return mockWriteStream;
        }
        return mockWriteStream;
      }),
    };

    // Spy on createWriteStream to return our mock
    const createWriteStreamSpy = jest.spyOn(fs, 'createWriteStream').mockReturnValue(mockWriteStream as any);

    await expect(request({ url: mockUrl, dest })).rejects.toThrow('Write stream error');

    // Restore the original implementation
    createWriteStreamSpy.mockRestore();

    // Clean up
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
    }
  });
});