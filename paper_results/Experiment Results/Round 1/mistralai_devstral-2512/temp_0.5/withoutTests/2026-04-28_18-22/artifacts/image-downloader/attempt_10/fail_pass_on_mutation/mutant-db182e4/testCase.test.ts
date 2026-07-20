import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";

describe("image downloader path resolution", () => {
  it("should correctly resolve relative destination paths to absolute", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";

    // Create a mock implementation of the request module
    const mockRequest = jest.fn((options) => {
      // In original code: path should be absolute
      // In mutated code: path will remain relative (since if (true) always executes)
      if (path.isAbsolute(options.dest)) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error(`Path was not resolved to absolute: ${options.dest}`));
      }
    });

    // Replace the request module with our mock
    jest.doMock("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js", () => mockRequest);

    // Import after mocking
    const { image } = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");

    // This should pass on original code but fail on mutated code
    await expect(image({ url: testUrl, dest: relativeDest })).resolves.not.toThrow();
  });
});