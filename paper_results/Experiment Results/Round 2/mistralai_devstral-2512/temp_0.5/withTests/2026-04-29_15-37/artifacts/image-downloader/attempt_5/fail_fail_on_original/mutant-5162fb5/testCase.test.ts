const download = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
const nock = require("nock");
const path = require("path");
const fs = require("fs");

describe("path resolution behavior", () => {
  it("should resolve relative destination path to absolute path", () => {
    const mockUrl = "http://someurl.com/image-success.jpg";
    const relativeDest = "./downloads";

    nock("http://someurl.com")
      .get("/image-success.jpg")
      .replyWithFile(200, path.join(__dirname, "../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg"), {
        "Content-Type": "image/jpeg",
      });

    return download.image({ url: mockUrl, dest: relativeDest }).then((result: { filename: string }) => {
      expect(path.isAbsolute(result.filename)).toBe(true);
      expect(result.filename).toMatch(/downloads\/image-success\.jpg$/);
      expect(() => fs.accessSync(result.filename)).not.toThrow();
    });
  });
});