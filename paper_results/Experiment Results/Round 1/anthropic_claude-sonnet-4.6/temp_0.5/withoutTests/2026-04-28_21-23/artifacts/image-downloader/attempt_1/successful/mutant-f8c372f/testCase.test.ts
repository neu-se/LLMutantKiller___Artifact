import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe("image downloader - missing dest option error message", () => {
  it("should reject with an error message containing 'options.dest is required' when dest is not provided", async () => {
    await expect(
      image({ url: "http://example.com/image.png" })
    ).rejects.toThrow("The options.dest is required");
  });
});