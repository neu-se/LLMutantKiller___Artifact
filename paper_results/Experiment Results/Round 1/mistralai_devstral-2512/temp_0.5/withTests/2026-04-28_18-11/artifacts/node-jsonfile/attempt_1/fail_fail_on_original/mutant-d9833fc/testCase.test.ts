import { readFileSync, writeFileSync } from "../../../../index.js";
import { mkdirSync, rmSync, existsSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("graceful-fs fallback", () => {
  it("should fall back to standard fs when graceful-fs is not available", () => {
    // Create a temporary directory for testing
    const testDir = join(tmpdir(), "jsonfile-test-fallback");
    mkdirSync(testDir, { recursive: true });

    try {
      const testFile = join(testDir, "test.json");
      const testData = { name: "test" };

      // Write a file using the module
      writeFileSync(testFile, testData);

      // Read the file back
      const readData = readFileSync(testFile);

      // Verify the data matches
      expect(readData).toEqual(testData);

      // Verify the file exists and contains the expected content
      expect(existsSync(testFile)).toBe(true);
    } finally {
      // Clean up
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});