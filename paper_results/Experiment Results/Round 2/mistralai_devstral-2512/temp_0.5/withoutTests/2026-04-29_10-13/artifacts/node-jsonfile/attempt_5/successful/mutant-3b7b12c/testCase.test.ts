import { readFile } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("readFile with string encoding option", () => {
  it("should fail when encoding is not properly passed through", async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), "jsonfile-test-"));
    const testFile = path.join(testDir, "test.json");
    const testData = { test: "data" };

    try {
      // Write file with utf16le encoding
      fs.writeFileSync(testFile, JSON.stringify(testData), "utf16le");

      // This should work with original code (encoding preserved)
      // but fail with mutated code (encoding lost, defaults to utf8)
      await expect(readFile(testFile, "utf16le")).resolves.toEqual(testData);
    } finally {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});