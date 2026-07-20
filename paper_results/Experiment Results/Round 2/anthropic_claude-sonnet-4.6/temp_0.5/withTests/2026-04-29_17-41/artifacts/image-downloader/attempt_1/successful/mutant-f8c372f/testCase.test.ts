import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe("image downloader - missing dest error message", () => {
  it("should reject with an error message containing 'options.dest is required' when dest is not provided", async () => {
    await expect(
      image({ url: "http://someurl.com/image.jpg", dest: null })
    ).rejects.toThrow("The options.dest is required");
  });
});