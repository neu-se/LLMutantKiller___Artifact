import request from "../../../../../../../../../../../subject_repositories/image-downloader/lib/request.js";
import nock from "nock";
import * as path from "path";
import * as os from "os";

describe("request write stream error handling", () => {
  it("should reject when write stream encounters an error due to invalid destination path", async () => {
    // Mock HTTP to return a successful 200 response
    nock("http://example.com")
      .get("/file.txt")
      .reply(200, "some file content");

    // Destination in a non-existent directory will cause write stream to error
    const invalidDest = path.join(
      os.tmpdir(),
      "definitely_nonexistent_dir_abc987",
      "output.txt"
    );

    await expect(
      request({
        url: "http://example.com/file.txt",
        dest: invalidDest,
      })
    ).rejects.toThrow();
  });
});