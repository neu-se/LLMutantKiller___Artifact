import jf from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { mkdirSync, rmSync, existsSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("graceful-fs fallback", () => {
  it("should fall back to standard fs when graceful-fs is not available", () => {
    // First delete graceful-fs to force fallback
    delete require.cache[require.resolve('graceful-fs')];
    const gracefulFsPath = require.resolve('graceful-fs');
    const originalFs = require('fs');

    // Create test directory
    const testDir = join(tmpdir(), "jsonfile-test-fallback");
    mkdirSync(testDir, { recursive: true });

    try {
      const testFile = join(testDir, "test.json");
      const testData = { name: "test" };

      // Write file using standard fs
      writeFileSync(testFile, JSON.stringify(testData));

      // Read file using jsonfile which should now fall back to standard fs
      const readData = jf.readFileSync(testFile);
      expect(readData).toEqual(testData);
      expect(existsSync(testFile)).toBe(true);
    } finally {
      // Clean up
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});