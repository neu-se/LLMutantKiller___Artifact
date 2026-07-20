const download = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
const path = require("path");
const fs = require("fs");
const nock = require("nock");

describe("path resolution behavior", () => {
  it("should resolve relative destination paths correctly", (done) => {
    const relativeDest = "./test/output";
    const mockUrl = "http://someurl.com/image-success.jpg";
    const expectedFilename = path.resolve(__dirname, relativeDest, "image-success.jpg");

    nock("http://someurl.com")
      .get("/image-success.jpg")
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