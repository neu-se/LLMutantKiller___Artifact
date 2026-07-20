import { request } from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js";
import * as nock from "nock";
import * as path from "path";
import * as os from "os";

describe("request error handling", () => {
  it("should reject the promise when the write stream emits an error", async () => {
    // Set up nock to intercept HTTP request and return 200 with some data
    const scope = nock("http://example.com")
      .get("/test-file.txt")
      .reply(200, "file content data");

    // Use a destination path that doesn't exist (non-existent directory)
    // This will cause the write stream to emit an 'error' event
    const nonExistentDir = path.join(os.tmpdir(), "nonexistent_dir_xyz_12345", "output.txt");

    await expect(
      request({
        url: "http://example.com/test-file.txt",
        dest: nonExistentDir,
      })
    ).rejects.toThrow();

    scope.done();
  });
});