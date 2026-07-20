import request from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js";
import http from "http";
import fs from "fs";
import path from "path";

describe("request module error handling", () => {
  it("should reject with correct error message when status code is not 200", async () => {
    const testUrl = "http://localhost:8080/test";
    const testDest = path.join(__dirname, "test-download.jpg");

    // Create a simple HTTP server to return a 404 status
    const server = http.createServer((req, res) => {
      res.writeHead(404);
      res.end();
    });
    server.listen(8080);

    try {
      await request({ url: testUrl, dest: testDest });
      fail("Expected request to reject");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain("Status Code: 404");
    } finally {
      // Clean up
      if (fs.existsSync(testDest)) {
        fs.unlinkSync(testDest);
      }
      server.close();
    }
  });
});