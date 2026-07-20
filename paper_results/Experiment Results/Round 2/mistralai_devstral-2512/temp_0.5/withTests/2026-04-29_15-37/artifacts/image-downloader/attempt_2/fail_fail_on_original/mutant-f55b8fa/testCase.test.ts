import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";
import fs from "fs";
import nock from "nock";

describe("path resolution behavior", () => {
  it("should resolve relative destination paths correctly", async () => {
    const relativeDest = "./test/output";
    const mockUrl = "http://someurl.com/image-success.jpg";
    const expectedFilename = path.resolve(__dirname, relativeDest, "image-success.jpg");

    nock(mockUrl)
      .get("/image-success.jpg")
      .replyWithFile(200, path.join(__dirname, "../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg"), {
        "Content-Type": "image/jpeg",
      });

    const result = await image({ url: mockUrl, dest: relativeDest });

    expect(result.filename).toBe(expectedFilename);
    expect(fs.existsSync(expectedFilename)).toBe(true);
    fs.unlinkSync(expectedFilename);
  });
});