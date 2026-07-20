import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";

describe("image downloader path resolution", () => {
  it("should correctly resolve relative destination paths to absolute", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";
    const originalDir = process.cwd();

    try {
      // Change to a known directory to make path resolution predictable
      process.chdir("/tmp");

      // Mock the request to avoid actual network calls
      const mockRequest = jest.fn().mockResolvedValue(undefined);
      jest.doMock("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js", () => mockRequest);

      await image({ url: testUrl, dest: relativeDest });

      // Get the path that was actually passed to request
      const calledPath = mockRequest.mock.calls[0][0].dest;

      // In original code: relative paths should be resolved to absolute
      // In mutated code: paths will remain relative (since if (true) always executes)
      expect(path.isAbsolute(calledPath)).toBe(true);
      expect(calledPath).toMatch(/^\/tmp.*downloads.*image\.jpg$/);
    } finally {
      process.chdir(originalDir);
    }
  });
});