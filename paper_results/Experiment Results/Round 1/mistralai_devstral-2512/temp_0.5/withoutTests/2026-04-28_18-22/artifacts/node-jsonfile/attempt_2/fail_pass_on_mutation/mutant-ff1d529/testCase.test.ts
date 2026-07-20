import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("readFileSync encoding option handling", () => {
  it("should preserve encoding option when passed as string", () => {
    const testDir = tmpdir();
    const testFile = join(testDir, "test.json");
    const testData = { test: "data" };

    writeFileSync(testFile, JSON.stringify(testData), "utf8");

    const result = readFileSync(testFile, "utf8");

    expect(result).toEqual(testData);
  });
});