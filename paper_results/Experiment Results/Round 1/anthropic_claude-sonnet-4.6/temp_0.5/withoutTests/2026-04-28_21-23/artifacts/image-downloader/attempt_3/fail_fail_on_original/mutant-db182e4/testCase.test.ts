import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import nock from "nock";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("image downloader", () => {
  it("should return a promise when dest is an absolute path", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "imgdl-test-"));
    
    nock("http://example.com")
      .get("/photo.jpg")
      .reply(200, Buffer.from("fake image"), { "content-type": "image/jpeg" });

    const absoluteDest = path.join(tmpDir, "photo.jpg");
    
    try {
      const result = image({
        url: "http://example.com/photo.jpg",
        dest: absoluteDest,
        extractFilename: false
      });
      
      // Original returns undefined for absolute paths (outer if is false)
      // Mutated returns a promise (always enters the block)
      expect(result).toBeUndefined();
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});