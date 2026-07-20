import { readFile } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import fs from "fs";
import path from "path";
import os from "os";

describe("readFile with string encoding option", () => {
  it("should fail when encoding is provided as string but file has invalid JSON", async () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), "jsonfile-test-"));
    const testFile = path.join(testDir, "test.json");
    const invalidJson = "not a valid json";

    fs.writeFileSync(testFile, invalidJson);

    try {
      await expect(readFile(testFile, "utf8")).rejects.toThrow();
    } finally {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
});