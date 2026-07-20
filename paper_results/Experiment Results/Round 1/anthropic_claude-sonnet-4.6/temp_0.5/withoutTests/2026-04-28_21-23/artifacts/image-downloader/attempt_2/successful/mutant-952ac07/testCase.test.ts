import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import * as http from "http";

const requestFn = require("../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js");

describe("request error handling", () => {
  it("should reject the promise when the HTTP request emits an error event", async () => {
    const tempDir = os.tmpdir();
    const destFile = path.join(tempDir, `test-download-${Date.now()}.txt`);

    // Create a local server that immediately destroys the connection to trigger an error
    const server = http.createServer((req, res) => {
      // Destroy the socket to simulate a connection error
      req.socket.destroy();
    });

    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const port = (server.address() as { port: number }).port;

    try {
      const downloadPromise = requestFn({
        url: `http://127.0.0.1:${port}/test-file`,
        dest: destFile,
      });

      await expect(downloadPromise).rejects.toThrow();
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
      try {
        if (fs.existsSync(destFile)) {
          fs.unlinkSync(destFile);
        }
      } catch {
        // ignore cleanup errors
      }
    }
  });
});