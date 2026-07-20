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

  it("should properly handle corrupted rows without emitting extra data", (done) => {
    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on("error", (err) => {
      if (errorEmitted) {
        done(new Error("Error event emitted multiple times"));
        return;
      }
      errorEmitted = true;
      expect(err.message).toContain("Could not load corrupted row:");
    });

    db.on("load", () => {
      setTimeout(() => {
        expect(errorEmitted).toBe(true);
        done();
      }, 100);
    });

    fs.writeFileSync(dbPath, "corrupted data\n");
  });
});