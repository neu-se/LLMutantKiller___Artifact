import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { writeFileSync } from "fs";
import { mkdirSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

describe("readFileSync encoding mutation detection", () => {
  it("should detect when encoding option is replaced with empty object", () => {
    const testDir = join(tmpdir(), "jsonfile-test-" + Math.random().toString(36).substring(2));
    mkdirSync(testDir, { recursive: true });
    const testFile = join(testDir, "test.json");
    const testData = { test: "data" };

    try {
      writeFileSync(testFile, JSON.stringify(testData), "utf8");
      // This will fail on mutated code because:
      // 1. Original: options = { encoding: options } (preserves encoding)
      // 2. Mutated: options = {} (loses encoding)
      // Without encoding, fs.readFileSync returns Buffer which fails JSON.parse
      const result = readFileSync(testFile, { encoding: "utf8" });
      expect(result).toEqual(testData);
    } finally {
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});