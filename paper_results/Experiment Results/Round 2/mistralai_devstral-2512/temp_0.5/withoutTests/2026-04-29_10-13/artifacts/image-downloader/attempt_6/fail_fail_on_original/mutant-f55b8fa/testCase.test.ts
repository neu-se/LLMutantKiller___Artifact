import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";

describe("image downloader path resolution", () => {
  it("should correctly handle relative destination paths", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";

    // Track the final destination path that would be used
    let finalDestPath: string | null = null;

    // Mock the request module to capture the final options
    jest.mock("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js", () => ({
      default: jest.fn((options: any) => {
        finalDestPath = options.dest;
        return Promise.resolve({});
      })
    }));

    await image({ url: testUrl, dest: relativeDest });

    // In original code: relative paths should be resolved to absolute
    // In mutated code: relative paths would remain relative (condition inverted)
    expect(path.isAbsolute(finalDestPath!)).toBe(true);
    expect(finalDestPath).toContain("downloads");
    expect(finalDestPath).toContain("image.jpg");
  });
});