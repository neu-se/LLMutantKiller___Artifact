// testCase.test.ts
const path = require('path');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

describe('path resolution behavior', () => {
  it('should resolve relative paths to absolute paths', () => {
    const relativeDest = 'test/output';
    const url = 'http://example.com/image.png';
    const expectedPath = path.resolve(__dirname, relativeDest, 'image.png');

    // Mock the request module to avoid actual network calls
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => ({
      __esModule: true,
      default: jest.fn().mockResolvedValue({ filename: expectedPath })
    }));

    return download.image({ url, dest: relativeDest }).then((result: any) => {
      expect(result.filename).toBe(expectedPath);
      expect(path.isAbsolute(result.filename)).toBe(true);
    });
  });
});