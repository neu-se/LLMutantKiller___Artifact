import { request } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js";
import * as nock from "nock";
import * as path from "path";
import * as os from "os";

describe("request error handling", () => {
  it("should reject the promise when the write stream emits an error", async () => {
    // Set up nock to intercept the HTTP request and return a 200 response
    nock("http://example.com")
      .get("/test-file.txt")
      .reply(200, "file content here");

    // Use a path that will cause a write stream error (non-existent directory)
    const invalidDest = path.join(os.tmpdir(), "non-existent-dir-xyz-123", "output.txt");

    const promise = request({
      url: "http://example.com/test-file.txt",
      dest: invalidDest,
    });

    // In the original code, the write stream error is caught and the promise is rejected
    // In the mutated code, the error handler is registered on "" event, so the error
    // propagates as an unhandled error and the promise never rejects
    await expect(promise).rejects.toThrow();
  });
});