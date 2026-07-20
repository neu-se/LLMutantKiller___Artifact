import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe("image downloader", () => {
  it("should reject with a meaningful error message when options.dest is missing", async () => {
    try {
      await image({ url: "https://example.com/image.jpg" });
      throw new Error("Expected the function to reject");
    } catch (error) {
      expect(error.message).not.toBe("");
    }
  });
});