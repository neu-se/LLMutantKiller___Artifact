import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("readFileSync encoding option handling", () => {
  it("should fail when encoding is not properly passed to fs.readFileSync", () => {
    const testDir = tmpdir();
    const testFile = join(testDir, "test.json");
    const testData = { test: "data" };

    // Create a file with specific encoding
    writeFileSync(testFile, JSON.stringify(testData), "utf8");

    // This should work in original but fail in mutated version
    const result = readFileSync(testFile, { encoding: "utf8", throws: false });

    expect(result).toEqual(testData);
  });
});