import { readFile } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("readFile with string encoding option", () => {
  it("should use the correct encoding when passed as a string", async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), "jsonfile-test-"));
    const testFile = path.join(testDir, "test.json");
    const testData = { hello: "world" };

    try {
      // Write file with latin1 encoding (different from default utf8)
      fs.writeFileSync(testFile, JSON.stringify(testData), "latin1");

      // This should work with original code (encoding is preserved)
      // but fail with mutated code (encoding is lost, defaults to utf8)
      const result = await readFile(testFile, "latin1");

      expect(result).toEqual(testData);
    } finally {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});