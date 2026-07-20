import { readFileSync } from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("readFileSync encoding option handling", () => {
  it("should fail when encoding option is not properly passed to fs.readFileSync", () => {
    const testDir = tmpdir();
    const testFile = join(testDir, "test-binary.json");
    const testData = { test: "data" };

    // Create a file with binary content that requires proper encoding
    const binaryContent = Buffer.from(JSON.stringify(testData), 'utf8');
    writeFileSync(testFile, binaryContent);

    // This will fail on mutated code because it won't pass the encoding option
    // The original code wraps options in { encoding: options }, while mutated just uses {}
    expect(() => {
      readFileSync(testFile, { encoding: 'utf8', throws: true });
    }).not.toThrow();
  });
});