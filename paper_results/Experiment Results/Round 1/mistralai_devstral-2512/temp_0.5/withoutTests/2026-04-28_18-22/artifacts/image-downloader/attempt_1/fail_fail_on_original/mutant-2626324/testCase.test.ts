// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/image-downloader/attempt_1/pending_category/mutant-2626324/testCase.test.ts
import { image } from "../../../../../../../../../../../subject_repositories/image-downloader/index.js";
import path from "path";
import fs from "fs";
import nock from "nock";

describe("image downloader", () => {
  it("should resolve relative destination path to absolute path", async () => {
    const testUrl = "https://example.com/image.jpg";
    const relativeDest = "./downloads";
    const expectedAbsoluteDest = path.resolve(__dirname, relativeDest, "image.jpg");

    // Mock the request to avoid actual network calls
    nock(testUrl).get("/image.jpg").reply(200, "mock image data");

    // Ensure the directory exists for the test
    const fullDirPath = path.resolve(__dirname, relativeDest);
    if (!fs.existsSync(fullDirPath)) {
      fs.mkdirSync(fullDirPath, { recursive: true });
    }

    try {
      await image({ url: testUrl, dest: relativeDest });
      // If the mutation is present, this will fail because the path won't be resolved
      // and the file won't be written to the expected location
      const files = fs.readdirSync(fullDirPath);
      expect(files).toContain("image.jpg");
    } finally {
      // Cleanup
      const filePath = path.join(fullDirPath, "image.jpg");
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      fs.rmdirSync(fullDirPath);
    }
  });
});