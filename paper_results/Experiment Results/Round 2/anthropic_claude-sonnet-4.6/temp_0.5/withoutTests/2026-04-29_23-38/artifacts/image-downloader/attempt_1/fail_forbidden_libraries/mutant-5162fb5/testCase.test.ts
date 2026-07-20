import * as path from 'path';
import { jest } from '@jest/globals';

describe('image downloader - relative path resolution', () => {
  it('should resolve relative dest path to absolute path before calling request', async () => {
    // We need to intercept the request module to see what options.dest was passed
    // Use jest module mocking to capture the dest value
    
    // Mock the lib/request module
    const capturedOptions: any[] = [];
    
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => {
      return jest.fn((options: any) => {
        capturedOptions.push({ ...options });
        return Promise.resolve({ filename: options.dest });
      });
    });
    
    const { image } = await import('../../../../../../../../../../../subject_repositories/image-downloader/index.js');
    
    const relativeDest = 'some/relative/path/image.jpg';
    
    await image({ url: 'http://example.com/image.jpg', dest: relativeDest, extractFilename: false });
    
    expect(capturedOptions.length).toBe(1);
    expect(path.isAbsolute(capturedOptions[0].dest)).toBe(true);
    expect(capturedOptions[0].dest).toContain('some/relative/path/image.jpg');
  });
});