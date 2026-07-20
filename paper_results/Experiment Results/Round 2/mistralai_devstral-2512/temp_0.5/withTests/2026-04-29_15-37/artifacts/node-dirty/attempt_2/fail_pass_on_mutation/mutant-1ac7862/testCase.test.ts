import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("test flush behavior with drain condition", () => {
  const testFile = path.join(__dirname, "test-drain.dirty");
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit drain event after all writes complete", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Set multiple keys to fill the queue
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      // Track drain events
      let drainCount = 0;
      db.on("drain", () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify all data was written
          expect(db.get("key1")).toBe("value1");
          expect(db.get("key2")).toBe("value2");
          expect(db.get("key3")).toBe("value3");
          done();
        }
      });
    });
  });
});