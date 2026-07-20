import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import nock from "nock";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("image downloader dest path handling", () => {
  it("should write file to the correct absolute destination when dest is already absolute", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "img-dl-test-"));
    const destFile = path.join(tmpDir, "test.jpg");
    
    nock("http://example.com")
      .get("/test.jpg")
      .reply(200, Buffer.from("fake-image-data"), { "content-type": "image/jpeg" });

    try {
      const result = await image({ url: "http://example.com/test.jpg", dest: destFile, extractFilename: false });
      expect(result.filename).toBe(destFile);
      expect(fs.existsSync(destFile)).toBe(true);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});