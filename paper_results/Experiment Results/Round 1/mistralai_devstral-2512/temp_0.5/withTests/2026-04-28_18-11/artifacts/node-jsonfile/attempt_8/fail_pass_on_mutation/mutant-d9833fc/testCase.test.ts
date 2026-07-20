import jf from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { mkdirSync, rmSync, existsSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("graceful-fs fallback", () => {
  it("should fail when graceful-fs is unavailable and fallback is broken", () => {
    const testDir = join(tmpdir(), "jsonfile-test-fallback");
    mkdirSync(testDir, { recursive: true });

    try {
      const testFile = join(testDir, "test.json");
      const testData = { name: "test" };

      // Write file using standard fs
      writeFileSync(testFile, JSON.stringify(testData));

      // Force graceful-fs to be unavailable by removing it from cache
      delete require.cache[require.resolve('graceful-fs')];

      // This should work in original code (fallback to fs)
      // but fail in mutated code (no fallback)
      const readData = jf.readFileSync(testFile);
      expect(readData).toEqual(testData);
    } finally {
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});