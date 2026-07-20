import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("readFileSync encoding option handling", () => {
  it("should properly handle encoding option when passed in options object", () => {
    const testDir = tmpdir();
    const testFile = join(testDir, "test.json");
    const testData = { test: "data" };

    writeFileSync(testFile, JSON.stringify(testData), "utf8");

    // This test will fail on mutated code because it won't pass the encoding option
    // The original code wraps options in { encoding: options }, while mutated just uses {}
    const result = readFileSync(testFile, { encoding: "utf8" });

    expect(result).toEqual(testData);
  });
});