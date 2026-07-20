import { request } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js";
import * as nock from "nock";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

describe("request error handling", () => {
  it("should reject the promise when a network error occurs on the request", async () => {
    // Clean up any existing nock interceptors
    nock.cleanAll();
    
    // Use nock to simulate a connection error
    const scope = nock("http://example.com")
      .get("/test-file.txt")
      .replyWithError("Connection refused");
    
    const dest = path.join(os.tmpdir(), `test-download-${Date.now()}.txt`);
    
    try {
      await expect(
        request({ url: "http://example.com/test-file.txt", dest })
      ).rejects.toThrow();
    } finally {
      // Clean up
      nock.cleanAll();
      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
      }
    }
  });
});