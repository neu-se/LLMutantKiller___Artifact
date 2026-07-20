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

  it("should not emit string return value from error handler", (done) => {
    const db = new Dirty(dbPath);
    let errorCount = 0;

    db.on("error", (err) => {
      errorCount++;
      expect(err.message).toContain("Could not load corrupted row:");
      if (errorCount > 1) {
        done(new Error("Multiple error events emitted"));
      }
    });

    // Capture all emitted events to detect unexpected string emissions
    const originalEmit = db.emit.bind(db);
    db.emit = function(event: string, ...args: any[]) {
      if (event === "error") {
        if (typeof args[0] === "string" && args[0].includes("Stryker")) {
          done(new Error("Unexpected string emission from error handler"));
          return false;
        }
      }
      return originalEmit(event, ...args);
    };

    fs.writeFileSync(dbPath, "corrupted data\n");
    db.emit("load", 0);
  });
});