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

  it("should emit drain event when write stream drains and no writes are in flight", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Write enough data to potentially trigger backpressure
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      let drainCount = 0;
      db.on("drain", () => {
        drainCount++;
        // The drain event should fire when all writes complete
        // This test specifically checks that the drain event fires
        // when _inFlightWrites reaches 0 (original behavior)
        if (drainCount === 1) {
          // Verify data was written correctly
          expect(db.get("key50")).toBe("value50");
          expect(db.size()).toBe(100);
          done();
        }
      });
    });
  });
});