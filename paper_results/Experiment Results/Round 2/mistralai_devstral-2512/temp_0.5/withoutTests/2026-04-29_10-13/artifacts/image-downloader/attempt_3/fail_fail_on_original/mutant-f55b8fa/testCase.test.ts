import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

describe("image downloader", () => {
  it("should resolve relative destination paths to absolute paths", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";
    const originalCwd = process.cwd();

    try {
      // Mock the request to avoid actual network calls
      const request = await import("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js");
      jest.spyOn(request, "default").mockResolvedValue({});

      const result = await image({ url: testUrl, dest: relativeDest });

      // In original code: relative paths get resolved to absolute
      // In mutated code: relative paths would not be resolved (condition inverted)
      const expectedPath = path.resolve(originalCwd, relativeDest, "image.jpg");
      expect(path.isAbsolute(expectedPath)).toBe(true);
    } finally {
      process.chdir(originalCwd);
    }
  });
});