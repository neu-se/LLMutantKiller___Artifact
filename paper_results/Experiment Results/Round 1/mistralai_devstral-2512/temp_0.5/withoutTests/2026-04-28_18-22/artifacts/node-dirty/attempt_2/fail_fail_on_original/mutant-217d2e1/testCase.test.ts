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

  it("should not emit extra data when encountering a corrupted row", (done) => {
    const db = new Dirty(dbPath);
    let errorCount = 0;
    let unexpectedDataCount = 0;

    db.on("error", (err) => {
      errorCount++;
      if (errorCount === 1) {
        expect(err.message).toContain("Could not load corrupted row:");
      } else {
        done(new Error("Unexpected additional error event"));
      }
    });

    db.on("load", () => {
      // Should not receive any unexpected data events
      setTimeout(() => {
        expect(unexpectedDataCount).toBe(0);
        done();
      }, 100);
    });

    // Write corrupted data that will trigger the error path
    fs.writeFileSync(dbPath, "corrupted data\n{}\n");
  });
});