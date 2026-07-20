import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("readFileSync encoding option handling", () => {
  it("should correctly handle encoding when options object contains encoding property", () => {
    const testDir = tmpdir();
    const testFile = join(testDir, "test.json");
    const testData = { test: "data" };

    // Write file with UTF-8 encoding
    writeFileSync(testFile, JSON.stringify(testData), "utf8");

    // This test will fail on mutated code because:
    // Original: options = { encoding: options } (preserves encoding)
    // Mutated: options = {} (loses encoding)
    const result = readFileSync(testFile, { encoding: "utf8" });

    expect(result).toEqual(testData);
  });
});