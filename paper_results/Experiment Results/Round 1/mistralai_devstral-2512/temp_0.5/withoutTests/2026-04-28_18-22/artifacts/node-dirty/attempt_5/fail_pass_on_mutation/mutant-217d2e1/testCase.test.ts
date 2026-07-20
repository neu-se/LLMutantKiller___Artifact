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

  it("should handle corrupted rows without unexpected return values", (done) => {
    const db = new Dirty(dbPath);
    let errorCount = 0;

    db.on("error", (err) => {
      errorCount++;
      expect(err.message).toContain("Could not load corrupted row:");
    });

    db.on("load", () => {
      expect(errorCount).toBe(1);
      done();
    });

    fs.writeFileSync(dbPath, "corrupted data\n");
  });
});