import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";
import fs from "fs";
import nock from "nock";

describe("path resolution behavior", () => {
  it("should resolve relative destination paths correctly", async () => {
    const relativeDest = "./test/output";
    const mockUrl = "http://example.com/test-image.jpg";
    const expectedFilename = path.resolve(__dirname, relativeDest, "test-image.jpg");

    nock(mockUrl)
      .get("/test-image.jpg")
      .replyWithFile(200, path.join(__dirname, "fixtures", "android.jpg"), {
        "Content-Type": "image/jpeg",
      });

    const result = await image({ url: mockUrl, dest: relativeDest });

    expect(result.filename).toBe(expectedFilename);
    expect(fs.existsSync(expectedFilename)).toBe(true);
    fs.unlinkSync(expectedFilename);
  });
});