import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("readFileSync encoding option handling", () => {
  it("should correctly handle encoding option when passed in options object", () => {
    const testDir = tmpdir();
    const testFile = join(testDir, "test.json");
    const testData = { test: "data" };

    writeFileSync(testFile, JSON.stringify(testData), "utf8");

    const result = readFileSync(testFile, { encoding: "utf8", reviver: (key, value) => value });

    expect(result).toEqual(testData);
  });
});