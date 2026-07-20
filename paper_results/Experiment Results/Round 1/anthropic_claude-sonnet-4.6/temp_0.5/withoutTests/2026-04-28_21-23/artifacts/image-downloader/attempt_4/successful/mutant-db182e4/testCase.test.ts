import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const { image } = require("../../../../../../../../../../../subject_repositories/image-downloader/index.js");
const nock = require("nock");

describe("image downloader", () => {
  it("should not normalize absolute dest path containing .. segments", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "imgdl-test-"));
    const subDir = path.join(tmpDir, "sub");
    fs.mkdirSync(subDir, { recursive: true });
    
    // Manually construct absolute path with .. (not normalized)
    const destWithDots = subDir + path.sep + ".." + path.sep + "photo.jpg";
    // e.g., /tmp/imgdl-test-XXX/sub/../photo.jpg
    
    nock("http://example.com")
      .get("/photo.jpg")
      .reply(200, Buffer.from("fake image content"), { "content-type": "image/jpeg" });

    try {
      const result = await image({
        url: "http://example.com/photo.jpg",
        dest: destWithDots,
        extractFilename: false
      });
      
      // Original: isAbsolute(destWithDots) = true, skip resolve, filename = destWithDots
      // Mutated: always resolve, filename = path.resolve(__dirname, destWithDots) = normalized path
      expect(result.filename).toBe(destWithDots);
    } finally {
      nock.cleanAll();
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});