import requestFn from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js";
import nock from "nock";
import * as path from "path";
import * as os from "os";

describe("request write stream error handling", () => {
  it("should reject the promise when the write stream emits an error due to invalid destination path", async () => {
    // Set up nock to intercept the HTTP request and return a 200 response
    nock("http://example.com")
      .get("/test-file.txt")
      .reply(200, "file content here");

    // Use a path that will cause a write stream error (non-existent directory)
    const invalidDest = path.join(os.tmpdir(), "non-existent-dir-xyz-abc-999", "output.txt");

    const promise = requestFn({
      url: "http://example.com/test-file.txt",
      dest: invalidDest,
    });

    // In the original code, the write stream error is caught via .on('error', reject)
    // and the promise is rejected.
    // In the mutated code, .on("", reject) doesn't catch the error event,
    // so the promise never rejects (it would hang or throw an unhandled error).
    await expect(promise).rejects.toThrow();
  });
});