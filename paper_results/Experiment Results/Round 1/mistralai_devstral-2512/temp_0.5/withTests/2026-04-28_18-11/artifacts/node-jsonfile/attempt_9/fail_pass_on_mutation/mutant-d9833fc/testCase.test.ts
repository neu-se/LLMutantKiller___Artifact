import jf from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { mkdirSync, rmSync, writeFileSync } from "fs";
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

      // Force graceful-fs to be unavailable
      const Module = require('module');
      const originalRequire = Module.prototype.require;
      Module.prototype.require = function(id: string) {
        if (id === 'graceful-fs') {
          throw new Error('graceful-fs not available');
        }
        return originalRequire.apply(this, arguments);
      };

      // This should work in original code (fallback to fs)
      // but fail in mutated code (no fallback)
      const readData = jf.readFileSync(testFile);
      expect(readData).toEqual(testData);

      // Restore original require
      Module.prototype.require = originalRequire;
    } finally {
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});