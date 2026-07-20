import { request } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js";
import nock from "nock";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

describe("request error handling", () => {
  it("should reject the promise when the HTTP request emits an error event", async () => {
    const tempDir = os.tmpdir();
    const destFile = path.join(tempDir, `test-download-${Date.now()}.txt`);

    // Use nock to intercept the request and simulate a network error
    nock("http://example.com")
      .get("/test-file")
      .replyWithError("ECONNREFUSED: Connection refused");

    const downloadPromise = request({
      url: "http://example.com/test-file",
      dest: destFile,
    });

    await expect(downloadPromise).rejects.toThrow();

    // Cleanup if file was created
    try {
      if (fs.existsSync(destFile)) {
        fs.unlinkSync(destFile);
      }
    } catch {
      // ignore cleanup errors
    }
  });
});