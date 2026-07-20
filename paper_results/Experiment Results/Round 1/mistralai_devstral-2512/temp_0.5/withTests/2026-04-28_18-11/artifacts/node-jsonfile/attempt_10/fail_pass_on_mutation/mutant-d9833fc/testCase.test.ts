import jf from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { mkdirSync, rmSync, writeFileSync } from "fs";
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
      // but throw in mutated code (no fallback)
      expect(() => {
        jf.readFileSync(testFile);
      }).not.toThrow();

      // Restore original require
      Module.prototype.require = originalRequire;
    } finally {
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});