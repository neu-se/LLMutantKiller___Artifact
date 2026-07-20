// testCase.test.ts
import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import nock from "nock";
import path from "path";
import fs from "fs";

describe("path resolution behavior", () => {
  it("should resolve relative destination paths correctly", async () => {
    const relativeDest = "test/output";
    const url = "http://someurl.com/image-success.png";
    const expectedAbsolutePath = path.resolve(__dirname, relativeDest, "image-success.png");

    nock("http://someurl.com")
      .get("/image-success.png")
      .replyWithFile(200, path.join(__dirname, "fixtures/android.jpg"), {
        "Content-Type": "image/jpeg",
      });

    const result = await image({ url, dest: relativeDest });

    expect(result.filename).toEqual(expectedAbsolutePath);
    expect(() => fs.accessSync(result.filename)).not.toThrow();
    expect(path.isAbsolute(result.filename)).toBe(true);
  });
});