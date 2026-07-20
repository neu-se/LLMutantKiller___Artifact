import jf from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { mkdirSync, rmSync, existsSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("graceful-fs fallback", () => {
  it("should handle graceful-fs being unavailable", () => {
    const testDir = join(tmpdir(), "jsonfile-test-fallback");
    mkdirSync(testDir, { recursive: true });

    try {
      const testFile = join(testDir, "test.json");
      const testData = { name: "test" };

      // Write file using standard fs
      writeFileSync(testFile, JSON.stringify(testData));

      // Read file using jsonfile
      const readData = jf.readFileSync(testFile);
      expect(readData).toEqual(testData);
      expect(existsSync(testFile)).toBe(true);
    } finally {
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});