import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("readFileSync encoding option handling", () => {
  it("should use encoding option when passed in options object with encoding property", () => {
    const testDir = tmpdir();
    const testFile = join(testDir, "test.json");
    const testData = { test: "data" };

    // Create a file with UTF-8 BOM to verify encoding handling
    writeFileSync(testFile, "\uFEFF" + JSON.stringify(testData), "utf8");

    const result = readFileSync(testFile, { encoding: "utf8" });

    expect(result).toEqual(testData);
  });
});