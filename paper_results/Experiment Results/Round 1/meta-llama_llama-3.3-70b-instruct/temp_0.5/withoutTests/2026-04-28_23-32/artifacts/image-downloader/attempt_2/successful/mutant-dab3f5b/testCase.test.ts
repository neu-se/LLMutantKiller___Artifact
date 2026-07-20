import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";

describe("image downloader", () => {
  it("should reject with a meaningful error message when url is missing", async () => {
    const originalError = await image({ dest: "test.jpg" }).catch((error) => error);
    expect(originalError.message).not.toBe("");
  });
});