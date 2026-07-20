import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("test flush behavior with multiple queued writes", () => {
  const testFile = path.join(__dirname, "test-multiple-writes.dirty");
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should process all queued writes in a single flush cycle", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Queue multiple writes
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      // Track when writes complete
      let writeCount = 0;
      const checkCompletion = () => {
        writeCount++;
        if (writeCount === 3) {
          // Verify all writes completed
          expect(db.get("key1")).toBe("value1");
          expect(db.get("key2")).toBe("value2");
          expect(db.get("key3")).toBe("value3");
          done();
        }
      };

      // The mutation would cause the loop to break immediately
      // preventing all writes from being processed
      db.on("drain", checkCompletion);
    });
  });
});