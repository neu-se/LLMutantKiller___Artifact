import { Readable } from 'stream';
import { createWriteStream } from 'fs';
import { request } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';

describe('request', () => {
  it('should reject the promise when an error occurs during the request', async () => {
    // Arrange
    const url = 'http://example.com';
    const dest = 'example.txt';
    const options = {};
    const readable = new Readable({
      read() {
        this.emit('error', new Error('Test error'));
      },
    });
    const originalGet = request.get;
    const originalPipe = Readable.prototype.pipe;

    // Mock the get method to return a readable stream that emits an error
    jest.spyOn(request, 'get').mockImplementationOnce((url, options, callback) => {
      return readable;
    });

    // Mock the pipe method to return the readable stream
    jest.spyOn(Readable.prototype, 'pipe').mockImplementationOnce((writeStream) => {
      return readable;
    });

    // Act and Assert
    await expect(request({ url, dest, ...options })).rejects.toThrow(Error);

    // Clean up
    jest.restoreAllMocks();
  });
});