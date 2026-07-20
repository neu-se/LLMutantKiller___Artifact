import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { writeFileSync } from "fs";
import { mkdirSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

describe("readFileSync encoding handling", () => {
  it("should properly handle encoding when passed as options object", () => {
    const testDir = join(tmpdir(), "jsonfile-test-" + Math.random().toString(36).substring(2));
    mkdirSync(testDir, { recursive: true });
    const testFile = join(testDir, "test.json");
    const testData = { key: "value" };

    try {
      writeFileSync(testFile, JSON.stringify(testData), "utf8");
      // This test will fail on mutated code because when options is replaced with {}
      // the encoding won't be passed to fs.readFileSync, causing it to return a Buffer
      // which will fail JSON.parse
      const result = readFileSync(testFile, { encoding: "utf8" });
      expect(result).toEqual(testData);
    } finally {
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});