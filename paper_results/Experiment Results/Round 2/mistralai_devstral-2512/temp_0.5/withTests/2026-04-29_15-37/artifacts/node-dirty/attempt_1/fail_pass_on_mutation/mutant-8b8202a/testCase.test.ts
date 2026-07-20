import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("drain event emission test", () => {
  const testFile = path.join(__dirname, "test-drain.dirty");
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit drain event only when all writes are complete", (done) => {
    db = new Dirty(testFile);
    let drainCount = 0;

    db.on("load", () => {
      db.set("key1", "value1", () => {
        // First write completes
      });

      db.set("key2", "value2", () => {
        // Second write completes
      });

      db.on("drain", () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify that drain was emitted only once after both writes
          setImmediate(() => {
            // Check that the file contains both entries
            const content = fs.readFileSync(testFile, "utf-8");
            const lines = content.trim().split("\n");
            expect(lines.length).toBe(2);
            expect(lines[0]).toContain('"key":"key1"');
            expect(lines[1]).toContain('"key":"key2"');
            done();
          });
        } else {
          done(new Error("drain event emitted more than once"));
        }
      });
    });
  });
});