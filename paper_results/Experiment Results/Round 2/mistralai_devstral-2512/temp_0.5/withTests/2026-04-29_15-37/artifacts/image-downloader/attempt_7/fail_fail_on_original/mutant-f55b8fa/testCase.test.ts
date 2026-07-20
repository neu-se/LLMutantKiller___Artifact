const download = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
const path = require("path");
const fs = require("fs");
const nock = require("nock");

describe("path resolution behavior", () => {
  it("should handle relative paths differently than absolute paths", (done) => {
    const relativeDest = "./test/output";
    const absoluteDest = path.join(__dirname, "../../../../../../../../../../../subject_repositories/image-downloader/test/output");
    const mockUrl = "http://someurl.com/image-success.jpg";

    // Setup nock for both test cases
    nock("http://someurl.com")
      .get("/image-success.jpg")
      .times(2)
      .replyWithFile(200, path.join(__dirname, "../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg"), {
        "Content-Type": "image/jpeg",
      });

    // Test with relative path
    download.image({ url: mockUrl, dest: relativeDest })
      .then((result: { filename: string }) => {
        // The relative path should be resolved to an absolute path
        expect(path.isAbsolute(result.filename)).toBe(true);
        expect(fs.existsSync(result.filename)).toBe(true);
        fs.unlinkSync(result.filename);

        // Test with absolute path
        return download.image({ url: mockUrl, dest: absoluteDest });
      })
      .then((result: { filename: string }) => {
        // The absolute path should remain absolute
        expect(path.isAbsolute(result.filename)).toBe(true);
        expect(fs.existsSync(result.filename)).toBe(true);
        fs.unlinkSync(result.filename);
        done();
      })
      .catch(done);
  });
});