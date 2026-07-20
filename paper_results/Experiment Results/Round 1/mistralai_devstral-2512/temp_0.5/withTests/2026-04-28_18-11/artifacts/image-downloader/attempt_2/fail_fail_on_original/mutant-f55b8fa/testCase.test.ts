const download = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
const nock = require("nock");
const path = require("path");
const fs = require("fs");

describe("path resolution behavior", () => {
  it("should resolve relative destination paths correctly", (done) => {
    const relativeDest = "./test-output";
    const mockUrl = "http://example.com/test-image.jpg";
    const expectedFilename = path.resolve(__dirname, relativeDest, "test-image.jpg");

    nock(mockUrl)
      .get("/test-image.jpg")
      .replyWithFile(200, path.join(__dirname, "../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg"), {
        "Content-Type": "image/jpeg",
      });

    download.image({ url: mockUrl, dest: relativeDest })
      .then(({ filename }) => {
        expect(filename).toBe(expectedFilename);
        expect(fs.existsSync(expectedFilename)).toBe(true);
        fs.unlinkSync(expectedFilename);
        done();
      })
      .catch(done);
  });
});