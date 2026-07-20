import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { writeFileSync } from "fs";
import { mkdirSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

describe("readFileSync encoding option mutation", () => {
  it("should fail when encoding option is not preserved in mutation", () => {
    const testDir = join(tmpdir(), "jsonfile-test-" + Math.random().toString(36).substring(2));
    mkdirSync(testDir, { recursive: true });
    const testFile = join(testDir, "test.json");
    const testData = { test: "data" };

    try {
      writeFileSync(testFile, JSON.stringify(testData), "utf8");
      const result = readFileSync(testFile, { encoding: "utf8" });
      expect(result).toEqual(testData);
    } finally {
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});