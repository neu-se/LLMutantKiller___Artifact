import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("readFileSync encoding option handling", () => {
  it("should fail when encoding option is not properly passed to fs.readFileSync", () => {
    const testDir = tmpdir();
    const testFile = join(testDir, "test-utf16.json");
    const testData = { test: "data" };

    // Create file with UTF-16 encoding
    writeFileSync(testFile, JSON.stringify(testData), "utf16le");

    // This will fail on mutated code because it won't pass the encoding option
    // Original: options = { encoding: options } (preserves encoding)
    // Mutated: options = {} (loses encoding, defaults to utf8)
    expect(() => {
      readFileSync(testFile, { encoding: "utf16le" });
    }).not.toThrow();
  });
});