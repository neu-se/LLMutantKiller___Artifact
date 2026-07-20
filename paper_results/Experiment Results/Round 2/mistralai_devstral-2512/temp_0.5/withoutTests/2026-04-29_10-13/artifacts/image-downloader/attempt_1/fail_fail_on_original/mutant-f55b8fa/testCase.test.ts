import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";
import fs from "fs";
import nock from "nock";

describe("image downloader", () => {
  it("should resolve relative destination path correctly", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";
    const expectedAbsolutePath = path.resolve(__dirname, relativeDest, "image.jpg");

    // Mock the request to avoid actual network calls
    nock("https://example.com")
      .get("/image.jpg")
      .replyWithFile(200, __filename, {
        "Content-Type": "application/javascript",
      });

    await image({ url: testUrl, dest: relativeDest });

    // Verify the file was created at the expected absolute path
    expect(fs.existsSync(expectedAbsolutePath)).toBe(true);

    // Clean up
    fs.unlinkSync(expectedAbsolutePath);
  });
});