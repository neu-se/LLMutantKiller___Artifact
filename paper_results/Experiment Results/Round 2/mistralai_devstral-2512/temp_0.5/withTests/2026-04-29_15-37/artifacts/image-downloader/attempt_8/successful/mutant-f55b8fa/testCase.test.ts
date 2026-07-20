const download = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
const path = require("path");
const fs = require("fs");
const nock = require("nock");

describe("path resolution behavior", () => {
  it("should resolve relative paths to absolute paths", (done) => {
    const relativeDest = "./test/output";
    const mockUrl = "http://someurl.com/image-success.jpg";

    // Create test directory if it doesn't exist
    const testDir = path.join(__dirname, "../../../../../../../../../../../subject_repositories/image-downloader/test/output");
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    nock("http://someurl.com")
      .get("/image-success.jpg")
      .replyWithFile(200, path.join(__dirname, "../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg"), {
        "Content-Type": "image/jpeg",
      });

    download.image({ url: mockUrl, dest: relativeDest })
      .then((result: { filename: string }) => {
        // The key assertion: relative path should be resolved to absolute
        expect(path.isAbsolute(result.filename)).toBe(true);
        // Should contain the resolved path components
        expect(result.filename).toContain("image-downloader");
        expect(result.filename).toContain("test");
        expect(result.filename).toContain("output");
        expect(result.filename).toContain("image-success.jpg");
        expect(fs.existsSync(result.filename)).toBe(true);
        fs.unlinkSync(result.filename);
        done();
      })
      .catch(done);
  });
});