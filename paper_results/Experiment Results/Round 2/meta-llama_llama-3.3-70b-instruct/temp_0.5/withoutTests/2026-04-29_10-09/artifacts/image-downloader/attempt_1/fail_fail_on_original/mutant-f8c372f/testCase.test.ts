import { image } from "../../../../../subject_repositories/image-downloader/index.js";

describe("image downloader", () => {
  it("should reject with a meaningful error message when options.dest is missing", async () => {
    await expect(image({ url: "https://example.com/image.jpg" })).rejects.toThrowError(
      "The options.dest is required"
    );
  });
});