import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe("image downloader - missing url error message", () => {
  it("should reject with the correct error message when options.url is not provided", async () => {
    await expect(image({ dest: "/tmp" })).rejects.toThrow("The options.url is required");
  });
});