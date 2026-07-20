import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";

describe("image downloader", () => {
  it("should resolve relative destination paths to absolute paths", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";

    // Mock the request module to avoid actual network calls
    jest.mock("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js", () => ({
      default: jest.fn().mockResolvedValue({})
    }));

    // Track whether path.resolve was called with a relative path
    let resolveCalledWithRelative = false;
    const originalResolve = path.resolve;
    path.resolve = jest.fn((...args) => {
      if (args.length > 0 && !path.isAbsolute(args[0])) {
        resolveCalledWithRelative = true;
      }
      return originalResolve(...args);
    });

    try {
      await image({ url: testUrl, dest: relativeDest });
      // In original code, path.resolve should be called with relative path
      // In mutated code, it wouldn't be called (condition inverted)
      expect(resolveCalledWithRelative).toBe(true);
    } finally {
      path.resolve = originalResolve;
    }
  });
});