import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import nock from "nock";
import path from "path";
import fs from "fs";

describe("path resolution behavior", () => {
  it("should resolve relative destination path to absolute path", async () => {
    const mockUrl = "http://someurl.com/image-success.jpg";
    const relativeDest = "./downloads";

    nock(mockUrl)
      .get("/image-success.jpg")
      .replyWithFile(200, path.join(__dirname, "../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg"), {
        "Content-Type": "image/jpeg",
      });

    const result = await image({ url: mockUrl, dest: relativeDest });
    expect(path.isAbsolute(result.filename)).toBe(true);
    expect(result.filename).toMatch(/downloads\/image-success\.jpg$/);
    expect(() => fs.accessSync(result.filename)).not.toThrow();
  });
});