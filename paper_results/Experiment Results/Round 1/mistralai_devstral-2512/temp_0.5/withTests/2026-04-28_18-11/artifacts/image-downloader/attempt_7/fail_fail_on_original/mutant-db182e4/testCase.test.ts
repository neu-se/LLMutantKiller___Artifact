// testCase.test.ts
const path = require('path');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

describe('path resolution behavior', () => {
  it('should correctly handle path.isAbsolute check', () => {
    // Test with a relative path
    const relativeDest = 'test/output';
    const url = 'http://example.com/image.png';

    // Spy on path.isAbsolute to verify it's called with the correct argument
    const isAbsoluteSpy = jest.spyOn(path, 'isAbsolute');

    // Mock the request to avoid actual network calls
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => ({
      __esModule: true,
      default: jest.fn().mockResolvedValue({ filename: path.resolve(__dirname, relativeDest, 'image.png') })
    }));

    return download.image({ url, dest: relativeDest }).then(() => {
      expect(isAbsoluteSpy).toHaveBeenCalledWith(relativeDest);
      expect(isAbsoluteSpy).toHaveBeenCalledTimes(1);

      // Verify the path was resolved correctly
      const expectedPath = path.resolve(__dirname, relativeDest, 'image.png');
      expect(path.isAbsolute(expectedPath)).toBe(true);
    });
  });
});