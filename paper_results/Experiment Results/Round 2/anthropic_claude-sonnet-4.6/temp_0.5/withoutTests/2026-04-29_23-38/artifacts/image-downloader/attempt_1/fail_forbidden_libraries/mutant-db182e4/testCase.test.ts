import * as path from 'path';
import { jest } from '@jest/globals';

describe('image-downloader', () => {
  it('should not modify an already absolute dest path', async () => {
    // Mock the request module
    const mockRequest = jest.fn().mockResolvedValue({ filename: '/absolute/path/image.jpg', image: Buffer.from('') });
    
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => mockRequest);
    
    const { image } = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');
    
    const absoluteDest = '/absolute/path/image.jpg';
    await image({ url: 'http://example.com/image.jpg', dest: absoluteDest, extractFilename: false });
    
    expect(mockRequest).toHaveBeenCalledWith(expect.objectContaining({ dest: absoluteDest }));
  });
});