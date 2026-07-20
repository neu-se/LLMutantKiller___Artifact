const download = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
const path = require("path");
const fs = require("fs");
const nock = require("nock");

describe("path resolution behavior", () => {
  it("should resolve absolute destination paths correctly", (done) => {
    const absoluteDest = path.join(__dirname, "../../../../../../../../../../../subject_repositories/image-downloader/test/output");
    const mockUrl = "http://someurl.com/image-success.jpg";
    const expectedFilename = path.join(absoluteDest, "image-success.jpg");

    // Ensure the directory exists
    if (!fs.existsSync(absoluteDest)) {
      fs.mkdirSync(absoluteDest, { recursive: true });
    }

    nock("http://someurl.com")
      .get("/image-success.jpg")
      .replyWithFile(200, path.join(__dirname, "../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg"), {
        "Content-Type": "image/jpeg",
      });

    download.image({ url: mockUrl, dest: absoluteDest })
      .then((result: { filename: string }) => {
        expect(result.filename).toBe(expectedFilename);
        expect(fs.existsSync(expectedFilename)).toBe(true);
        fs.unlinkSync(expectedFilename);
        done();
      })
      .catch(done);
  });
});