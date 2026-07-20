const download = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
const nock = require("nock");
const path = require("path");
const fs = require("fs");

describe("path resolution behavior", () => {
  it("should resolve relative destination paths correctly", (done) => {
    const relativeDest = path.join(__dirname, "./test-output");
    const mockUrl = "http://someurl.com/image-success.png";
    const expectedFilename = path.join(relativeDest, "image-success.png");

    // Ensure test output directory exists
    if (!fs.existsSync(relativeDest)) {
      fs.mkdirSync(relativeDest, { recursive: true });
    }

    nock("http://someurl.com")
      .get("/image-success.png")
      .replyWithFile(200, path.join(__dirname, "../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg"), {
        "Content-Type": "image/jpeg",
      });

    download.image({ url: mockUrl, dest: relativeDest })
      .then(({ filename }: { filename: string }) => {
        expect(filename).toBe(expectedFilename);
        expect(fs.existsSync(expectedFilename)).toBe(true);
        fs.unlinkSync(expectedFilename);
        done();
      })
      .catch(done);
  });
});