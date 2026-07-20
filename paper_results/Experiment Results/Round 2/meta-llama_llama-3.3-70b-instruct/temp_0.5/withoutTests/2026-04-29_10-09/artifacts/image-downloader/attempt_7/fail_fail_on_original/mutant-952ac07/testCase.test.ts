import request from '../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js';
import { EventEmitter } from 'events';

describe('request', () => {
  it('should reject the promise when an error occurs during the request', async () => {
    // Arrange
    const url = 'http://example.com';
    const dest = 'example.txt';
    const options = {};

    const originalEmit = EventEmitter.prototype.emit;
    EventEmitter.prototype.emit = function(eventName, ...args) {
      if (eventName === 'error') {
        throw new Error('Test error');
      }
      return originalEmit.call(this, eventName, ...args);
    };

    try {
      // Act and Assert
      await expect(request({ url, dest, ...options })).rejects.toThrow();
    } finally {
      EventEmitter.prototype.emit = originalEmit;
    }

    // Clean up
    try {
      require('fs').unlinkSync(dest);
    } catch (err) {
      // File does not exist, ignore error
    }
  });
});