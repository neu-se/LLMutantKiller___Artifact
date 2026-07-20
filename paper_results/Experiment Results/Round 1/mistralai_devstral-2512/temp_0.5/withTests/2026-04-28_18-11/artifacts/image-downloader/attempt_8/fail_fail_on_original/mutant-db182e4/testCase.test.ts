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
    const mockRequest = jest.fn().mockResolvedValue({ filename: '/mock/path' });
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => mockRequest);

    return download.image({ url, dest: relativeDest }).then(() => {
      expect(isAbsoluteSpy).toHaveBeenCalledWith(relativeDest);
      expect(isAbsoluteSpy).toHaveBeenCalledTimes(1);
    });
  });
});