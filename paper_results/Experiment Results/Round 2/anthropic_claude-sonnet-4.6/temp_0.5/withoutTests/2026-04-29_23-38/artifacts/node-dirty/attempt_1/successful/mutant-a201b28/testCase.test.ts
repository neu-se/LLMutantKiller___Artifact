import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("Dirty - corrupted row error handling", () => {
  it("should emit 'error' event when a corrupted row is encountered during load", (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.db`);

    // Write a file with a corrupted row (invalid JSON)
    const corruptedContent = "this is not valid json\n";
    fs.writeFileSync(dbPath, corruptedContent, "utf-8");

    const db = new Dirty(dbPath);

    let errorEmitted = false;

    db.on("error", (err: Error) => {
      errorEmitted = true;
      expect(err.message).toContain("Could not load corrupted row");
    });

    db.on("load", () => {
      // Clean up
      try {
        fs.unlinkSync(dbPath);
      } catch (e) {
        // ignore
      }

      expect(errorEmitted).toBe(true);
      done();
    });
  });
});