const download = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
const nock = require("nock");
const path = require("path");
const fs = require("fs");

describe("path resolution behavior", () => {
  it("should resolve relative destination paths correctly", (done) => {
    const relativeDest = "./test-output";
    const mockUrl = "http://someurl.com/image-success.png";
    const expectedFilename = path.resolve(__dirname, relativeDest, "image-success.png");

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