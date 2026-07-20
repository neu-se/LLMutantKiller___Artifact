import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("drain event emission on write stream drain", () => {
  const testFile = path.join(__dirname, "test-drain.dirty");
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit drain event when all writes complete and queue is empty", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Set multiple values to ensure multiple writes
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      let drainCount = 0;
      db.on("drain", () => {
        drainCount++;
        // The drain event should fire exactly once when all writes are complete
        if (drainCount === 1) {
          // Verify the file was written correctly
          const content = fs.readFileSync(testFile, "utf-8");
          const lines = content.trim().split("\n");
          expect(lines.length).toBe(3);
          done();
        }
      });
    });
  });
});