import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("readFileSync encoding option handling", () => {
  it("should correctly handle encoding when options is an object with encoding property", () => {
    const testDir = tmpdir();
    const testFile = join(testDir, "test-latin1.json");
    const testData = { test: "café" };

    // Create file with latin1 encoding
    writeFileSync(testFile, JSON.stringify(testData), "latin1");

    // This will fail on mutated code because:
    // Original: options = { encoding: options } (preserves encoding)
    // Mutated: options = {} (loses encoding, defaults to utf8)
    const result = readFileSync(testFile, { encoding: "latin1" });

    expect(result).toEqual(testData);
  });
});