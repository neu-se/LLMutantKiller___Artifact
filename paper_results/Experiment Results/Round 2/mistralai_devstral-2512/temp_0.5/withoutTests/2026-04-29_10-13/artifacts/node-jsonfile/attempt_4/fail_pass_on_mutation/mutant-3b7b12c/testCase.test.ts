import { readFile } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("readFile with string encoding option", () => {
  it("should properly handle encoding when passed as string", async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), "jsonfile-test-"));
    const testFile = path.join(testDir, "test.json");
    const testData = { test: "data" };

    try {
      // Write with binary data that would fail with wrong encoding
      const binaryData = Buffer.from(JSON.stringify(testData), 'binary');
      fs.writeFileSync(testFile, binaryData);

      // Read with binary encoding - should work in original code
      // but fail in mutated code where encoding is lost (defaults to utf8)
      const result = await readFile(testFile, "binary");
      expect(result).toEqual(testData);
    } finally {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});