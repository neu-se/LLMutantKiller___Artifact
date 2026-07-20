import { image } from "../index.js";

describe("image downloader", () => {
  it("should reject with a meaningful error message when url is missing", async () => {
    await expect(image({ dest: "test.jpg" })).rejects.toThrowError(
      "The options.url is required"
    );
  });
});