import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe("image downloader error handling", () => {
  it("should reject with a specific error message when dest is missing", async () => {
    await expect(image({ url: "http://example.com/image.jpg" })).rejects.toThrow(
      "The options.dest is required"
    );
  });
});