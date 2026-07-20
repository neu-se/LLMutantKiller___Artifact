const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js");
const nock = require("nock");
const fs = require("fs");
const path = require("path");

describe("request module error handling", () => {
  it("should reject with a properly formatted error message for non-200 status codes", async () => {
    const testUrl = "http://example.com/image.jpg";
    const testDest = path.join(__dirname, "test-download.jpg");

    nock(testUrl).get("/image.jpg").reply(404);

    try {
      await request({ url: testUrl, dest: testDest });
      fail("Expected request to reject with an error");
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain("Request Failed.");
      expect(error.message).toContain("Status Code: 404");
    } finally {
      if (fs.existsSync(testDest)) {
        fs.unlinkSync(testDest);
      }
      nock.cleanAll();
    }
  });
});