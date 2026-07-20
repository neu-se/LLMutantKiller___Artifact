// testCase.test.ts
const path = require('path');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

describe('path resolution behavior', () => {
  it('should correctly handle path.isAbsolute check', () => {
    // Test with a relative path
    const relativeDest = 'test/output';
    const url = 'http://example.com/image.png';

    // Mock the request module before requiring the main module
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => ({
      __esModule: true,
      default: jest.fn().mockResolvedValue({ filename: '/mock/path' })
    }));

    // Spy on path.isAbsolute to verify it's called with the correct argument
    const isAbsoluteSpy = jest.spyOn(path, 'isAbsolute');

    return download.image({ url, dest: relativeDest }).then(() => {
      expect(isAbsoluteSpy).toHaveBeenCalledWith(relativeDest);
      expect(isAbsoluteSpy).toHaveBeenCalledTimes(1);
    });
  });
});