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

  it("should not return unexpected string from error handler", (done) => {
    const db = new Dirty(dbPath);
    let errorCount = 0;
    let unexpectedReturn = false;

    db.on("error", (err) => {
      errorCount++;
      expect(err.message).toContain("Could not load corrupted row:");
    });

    // Override the emit function to detect unexpected return values
    const originalEmit = db.emit;
    db.emit = function(event: string, ...args: any[]) {
      const result = originalEmit.apply(this, [event, ...args]);
      if (result === "Stryker was here!") {
        unexpectedReturn = true;
      }
      return result;
    };

    db.on("load", () => {
      expect(errorCount).toBe(1);
      expect(unexpectedReturn).toBe(false);
      done();
    });

    fs.writeFileSync(dbPath, "corrupted data\n");
  });
});