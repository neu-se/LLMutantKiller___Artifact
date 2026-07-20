import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";

describe("image downloader path resolution", () => {
  it("should correctly resolve relative destination paths to absolute", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";

    // Create a mock implementation of the request module
    const mockRequest = jest.fn((options) => {
      // Verify the path was resolved to absolute
      if (!path.isAbsolute(options.dest)) {
        throw new Error(`Expected absolute path but got: ${options.dest}`);
      }
      return Promise.resolve();
    });

    // Replace the request module with our mock
    jest.doMock("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js", () => mockRequest);

    // Import after mocking
    const { image } = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");

    await expect(image({ url: testUrl, dest: relativeDest })).resolves.not.toThrow();

    // Verify the mock was called with absolute path
    expect(mockRequest).toHaveBeenCalled();
    const calledPath = mockRequest.mock.calls[0][0].dest;
    expect(path.isAbsolute(calledPath)).toBe(true);
  });
});