import jf from "./index.js";
import { mkdirSync, rmSync, existsSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("graceful-fs fallback", () => {
  it("should fall back to standard fs when graceful-fs is not available", () => {
    const testDir = join(tmpdir(), "jsonfile-test-fallback");
    mkdirSync(testDir, { recursive: true });

    try {
      const testFile = join(testDir, "test.json");
      const testData = { name: "test" };

      writeFileSync(testFile, JSON.stringify(testData));
      const readData = jf.readFileSync(testFile);
      expect(readData).toEqual(testData);
      expect(existsSync(testFile)).toBe(true);
    } finally {
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});