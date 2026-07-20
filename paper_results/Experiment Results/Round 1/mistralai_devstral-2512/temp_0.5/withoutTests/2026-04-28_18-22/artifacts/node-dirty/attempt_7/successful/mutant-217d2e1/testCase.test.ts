// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/node-dirty/attempt_1/pending_category/mutant-217d2e1/testCase.test.ts
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("Dirty database corrupted row handling", () => {
  const testDir = fs.mkdtempSync(path.join(os.tmpdir(), "dirty-test-"));
  const dbPath = path.join(testDir, "test.db");

  afterAll(() => {
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  it("should properly handle corrupted rows without string return values", (done) => {
    const db = new Dirty(dbPath);
    let errorCount = 0;
    let returnValue: any = null;

    // Intercept the forEach callback to capture return values
    const originalForEach = Array.prototype.forEach;
    Array.prototype.forEach = function(callback: (...args: any[]) => any) {
      const wrappedCallback = (...args: any[]) => {
        const result = callback(...args);
        if (result === "Stryker was here!") {
          returnValue = result;
        }
        return result;
      };
      originalForEach.call(this, wrappedCallback);
    };

    db.on("error", (err) => {
      errorCount++;
      expect(err.message).toContain("Could not load corrupted row:");
    });

    db.on("load", () => {
      expect(errorCount).toBe(1);
      expect(returnValue).not.toBe("Stryker was here!");
      done();
    });

    fs.writeFileSync(dbPath, "corrupted data\n");
  });
});