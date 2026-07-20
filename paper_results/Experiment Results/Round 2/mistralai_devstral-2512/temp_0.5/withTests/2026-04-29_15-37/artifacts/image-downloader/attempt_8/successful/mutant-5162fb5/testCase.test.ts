const download = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
const nock = require("nock");
const path = require("path");
const fs = require("fs");

describe("path resolution behavior", () => {
  it("should resolve relative destination path to absolute path", () => {
    const mockUrl = "http://someurl.com/image-success.jpg";
    const relativeDest = "./downloads";

    // Create the downloads directory if it doesn't exist
    const downloadsPath = path.join(__dirname, "../../../../../../../../../../../subject_repositories/image-downloader/downloads");
    if (!fs.existsSync(downloadsPath)) {
      fs.mkdirSync(downloadsPath, { recursive: true });
    }

    nock("http://someurl.com")
      .get("/image-success.jpg")
      .reply(200, "mock image data", {
        "Content-Type": "image/jpeg",
      });

    return download.image({ url: mockUrl, dest: relativeDest }).then((result: { filename: string }) => {
      expect(path.isAbsolute(result.filename)).toBe(true);
      expect(result.filename).toMatch(/downloads\/image-success\.jpg$/);
    });
  });
});