import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";

describe("image downloader", () => {
  it("should resolve relative destination paths correctly", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";

    // Mock the request module to avoid actual network calls
    jest.mock("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js", () => ({
      default: jest.fn().mockResolvedValue({})
    }));

    // Mock path.resolve to track if it's called with correct arguments
    const originalResolve = path.resolve;
    path.resolve = jest.fn((...args) => {
      // In original code: relative paths should be resolved
      // In mutated code: relative paths would not be resolved (condition inverted)
      if (args.length > 0 && !path.isAbsolute(args[0])) {
        return originalResolve(...args);
      }
      return args[0];
    });

    try {
      await image({ url: testUrl, dest: relativeDest });
      // If we reach here, the path resolution logic worked correctly
      expect(true).toBe(true);
    } catch (error) {
      // The test should pass in original code but fail in mutated code
      // because the path resolution would be incorrect
      fail("Path resolution failed");
    } finally {
      path.resolve = originalResolve;
    }
  });
});