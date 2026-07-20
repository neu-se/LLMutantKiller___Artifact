const request = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js");
const http = require("http");
const fs = require("fs");
const path = require("path");

describe("request module error handling", () => {
  it("should reject with a properly formatted error message for non-200 status codes", async () => {
    const testDest = path.join(__dirname, "test-download.jpg");
    let server: http.Server;

    try {
      // Create a test server that returns 404
      server = http.createServer((req, res) => {
        res.writeHead(404);
        res.end();
      });
      server.listen(0);

      const port = (server.address() as any).port;
      const testUrl = `http://localhost:${port}/image.jpg`;

      await expect(request({ url: testUrl, dest: testDest }))
        .rejects
        .toThrow("Request Failed.\nStatus Code: 404");
    } finally {
      if (fs.existsSync(testDest)) {
        fs.unlinkSync(testDest);
      }
      if (server) {
        server.close();
      }
    }
  });
});