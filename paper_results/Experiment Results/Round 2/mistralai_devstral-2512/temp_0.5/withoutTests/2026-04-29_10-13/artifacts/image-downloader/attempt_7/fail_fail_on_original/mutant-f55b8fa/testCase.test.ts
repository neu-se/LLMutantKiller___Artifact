import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";

describe("image downloader path resolution", () => {
  it("should resolve relative destination paths to absolute paths", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";

    // Mock the request module to avoid actual network calls
    const request = await import("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js");
    jest.spyOn(request, "default").mockImplementation((options: any) => {
      // Verify the path was resolved correctly
      expect(path.isAbsolute(options.dest)).toBe(true);
      expect(options.dest).toContain("downloads");
      expect(options.dest).toContain("image.jpg");
      return Promise.resolve({});
    });

    await image({ url: testUrl, dest: relativeDest });
  });
});