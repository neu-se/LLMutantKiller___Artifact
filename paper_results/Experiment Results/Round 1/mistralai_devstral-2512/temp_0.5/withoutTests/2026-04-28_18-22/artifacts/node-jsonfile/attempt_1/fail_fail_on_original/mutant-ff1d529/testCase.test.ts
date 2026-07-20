import { readFileSync } from "./index.js";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("readFileSync with encoding option", () => {
  it("should correctly parse JSON when encoding is specified in options", () => {
    const testDir = tmpdir();
    const testFile = join(testDir, "test.json");
    const testData = { hello: "world" };

    writeFileSync(testFile, JSON.stringify(testData), "utf8");

    const result = readFileSync(testFile, { encoding: "utf8" });

    expect(result).toEqual(testData);
  });
});