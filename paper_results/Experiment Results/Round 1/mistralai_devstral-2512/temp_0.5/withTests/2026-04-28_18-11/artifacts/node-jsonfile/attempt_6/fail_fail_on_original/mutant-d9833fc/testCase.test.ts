import jf from "../../../../../../../../../../../subject_repositories/node-jsonfile/index.js";
import { mkdirSync, rmSync, existsSync, writeFileSync, readFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

describe("graceful-fs fallback", () => {
  it("should use standard fs when graceful-fs is not available", () => {
    // Force graceful-fs to be unavailable by mocking require
    const Module = require('module');
    const originalRequire = Module.prototype.require;

    Module.prototype.require = function(id) {
      if (id === 'graceful-fs') {
        throw new Error('graceful-fs not available');
      }
      return originalRequire.apply(this, arguments);
    };

    try {
      const testDir = join(tmpdir(), "jsonfile-test-fallback");
      mkdirSync(testDir, { recursive: true });

      const testFile = join(testDir, "test.json");
      const testData = { name: "test" };

      // Write file using standard fs
      writeFileSync(testFile, JSON.stringify(testData));

      // Read file using jsonfile which should fall back to standard fs
      const readData = jf.readFileSync(testFile);
      expect(readData).toEqual(testData);
      expect(existsSync(testFile)).toBe(true);
    } finally {
      // Restore original require
      Module.prototype.require = originalRequire;
      rmSync(testDir, { recursive: true, force: true });
    }
  });
});