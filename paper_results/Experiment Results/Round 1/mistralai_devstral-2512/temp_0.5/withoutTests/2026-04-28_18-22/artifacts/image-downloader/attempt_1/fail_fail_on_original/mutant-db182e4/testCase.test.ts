import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";
import fs from "fs";
import nock from "nock";

describe("image downloader", () => {
  it("should resolve relative destination paths correctly", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";
    const expectedAbsoluteDest = path.resolve(__dirname, relativeDest, "image.jpg");

    // Mock the request to avoid actual network calls
    nock(testUrl).get("/image.jpg").reply(200, "mock image data");

    await expect(image({ url: testUrl, dest: relativeDest })).resolves.not.toThrow();

    // Verify the destination path was resolved correctly
    expect(fs.existsSync(expectedAbsoluteDest)).toBe(true);

    // Clean up
    if (fs.existsSync(expectedAbsoluteDest)) {
      fs.unlinkSync(expectedAbsoluteDest);
    }
    nock.cleanAll();
  });
});