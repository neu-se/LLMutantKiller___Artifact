import { readFile } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("readFile with string encoding option", () => {
  it("should preserve encoding when passed as string option", async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), "jsonfile-test-"));
    const testFile = path.join(testDir, "test.json");
    const testData = { test: "data" };

    try {
      // Write file with explicit latin1 encoding
      fs.writeFileSync(testFile, JSON.stringify(testData), "latin1");

      // Read with latin1 encoding - should work in original code
      // but fail in mutated code where encoding is lost
      const result = await readFile(testFile, "latin1");
      expect(result).toEqual(testData);
    } finally {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});