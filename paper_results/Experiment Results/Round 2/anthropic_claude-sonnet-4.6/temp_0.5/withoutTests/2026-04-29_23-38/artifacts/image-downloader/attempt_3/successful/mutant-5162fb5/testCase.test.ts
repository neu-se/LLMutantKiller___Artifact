import * as path from 'path';

describe('image downloader path resolution', () => {
  it('should resolve a relative dest path to an absolute path before calling request', async () => {
    // Mock the request module to capture what options.dest is passed
    const capturedDest: string[] = [];
    
    jest.mock(
      '../../../../../../../../../../../subject_repositories/image-downloader/lib/request',
      () => (options: any) => {
        capturedDest.push(options.dest);
        return Promise.resolve({ filename: options.dest });
      },
      { virtual: false }
    );

    // Re-require after mocking
    jest.resetModules();
    jest.mock(
      '../../../../../../../../../../../subject_repositories/image-downloader/lib/request',
      () => (options: any) => {
        capturedDest.push(options.dest);
        return Promise.resolve({ filename: options.dest });
      }
    );

    const { image } = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

    await image({
      url: 'http://example.com/photo.jpg',
      dest: 'relative/path/photo.jpg',
      extractFilename: false,
    });

    expect(capturedDest.length).toBe(1);
    // In original code, relative path gets resolved to absolute
    expect(path.isAbsolute(capturedDest[0])).toBe(true);
  });
});