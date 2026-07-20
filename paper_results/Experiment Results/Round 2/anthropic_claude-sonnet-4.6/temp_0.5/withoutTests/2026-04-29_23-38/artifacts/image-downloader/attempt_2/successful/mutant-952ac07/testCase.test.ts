import downloadRequest from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js";
import nock = require("nock");
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

describe("request error handling", () => {
  it("should reject the promise when a network error occurs on the request", async () => {
    nock.cleanAll();
    
    nock("http://example.com")
      .get("/test-file.txt")
      .replyWithError("Connection refused");
    
    const dest = path.join(os.tmpdir(), `test-download-error-${Date.now()}.txt`);
    
    try {
      await expect(
        downloadRequest({ url: "http://example.com/test-file.txt", dest })
      ).rejects.toThrow("Connection refused");
    } finally {
      nock.cleanAll();
      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
      }
    }
  });
});