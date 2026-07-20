import { request } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js";
import nock from "nock";
import fs from "fs";
import path from "path";

describe("request module error handling", () => {
  it("should reject with a properly formatted error message for non-200 status codes", async () => {
    const testUrl = "http://example.com/image.jpg";
    const testDest = path.join(__dirname, "test-download.jpg");

    // Setup nock to intercept the HTTP request and return a 404 status
    nock(testUrl).get("/image.jpg").reply(404);

    try {
      await request({ url: testUrl, dest: testDest });
      fail("Expected request to reject with an error");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain("Request Failed.");
      expect(error.message).toContain("Status Code: 404");
    } finally {
      // Clean up the test file if it exists
      if (fs.existsSync(testDest)) {
        fs.unlinkSync(testDest);
      }
      nock.cleanAll();
    }
  });
});