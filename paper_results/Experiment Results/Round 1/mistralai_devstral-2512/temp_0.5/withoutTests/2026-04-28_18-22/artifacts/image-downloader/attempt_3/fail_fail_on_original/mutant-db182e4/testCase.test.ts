import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";

describe("image downloader path resolution", () => {
  it("should correctly handle relative destination paths", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";
    const expectedPath = path.resolve(__dirname, relativeDest, "image.jpg");

    // Mock the request module to avoid actual network calls
    const mockRequest = jest.fn().mockResolvedValue(undefined);
    jest.doMock("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js", () => mockRequest);

    await image({ url: testUrl, dest: relativeDest });

    // Verify the path was resolved correctly (should be absolute path)
    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        dest: expect.stringMatching(new RegExp(`^${path.sep === '\\' ? '[A-Za-z]:\\\\' : ''}`))
      })
    );

    // In the original code, relative paths get resolved to absolute
    // In the mutated code (if (true)), the path won't be resolved
    const calledPath = mockRequest.mock.calls[0][0].dest;
    expect(path.isAbsolute(calledPath)).toBe(true);
  });
});