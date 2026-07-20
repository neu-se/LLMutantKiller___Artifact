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

  it("should emit drain event when write stream drains with no pending writes", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Write data to trigger the drain event
      db.set("key1", "value1");
      db.set("key2", "value2");

      // Force a drain by writing enough data to fill the buffer
      for (let i = 0; i < 1000; i++) {
        db.set(`large${i}`, "x".repeat(1000));
      }

      let drainFired = false;
      db.on("drain", () => {
        if (!drainFired) {
          drainFired = true;
          // Verify the drain event fired correctly
          expect(db.get("key1")).toBe("value1");
          expect(db.size()).toBeGreaterThan(0);
          done();
        }
      });

      // The mutation prevents drain from firing when _inFlightWrites <= 0
      // This test will timeout on the mutated version because drain never fires
    });
  });
});