// testCase.test.ts
import path from 'path';
import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe('path resolution behavior', () => {
  it('should correctly handle relative paths in destination', async () => {
    const relativeDest = 'test/output';
    const url = 'http://example.com/image.png';
    const expectedPath = path.resolve(__dirname, relativeDest, 'image.png');

    // Mock the request module to avoid actual network calls
    const mockRequest = jest.fn().mockResolvedValue({ filename: expectedPath });
    jest.mock('../../../../../../../../../../../subject_repositories/image-downloader/lib/request', () => mockRequest);

    const result = await image({ url, dest: relativeDest });
    expect(result.filename).toBe(expectedPath);
    expect(path.isAbsolute(result.filename)).toBe(true);
  });
});