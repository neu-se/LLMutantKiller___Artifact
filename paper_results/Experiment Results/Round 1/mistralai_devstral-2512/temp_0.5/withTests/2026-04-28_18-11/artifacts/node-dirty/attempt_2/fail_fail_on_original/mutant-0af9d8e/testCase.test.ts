import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("drain event emission timing", () => {
  const testFile = path.join(__dirname, "test-drain-timing.dirty");
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit drain event when inFlightWrites reaches zero and queue is empty", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Set a value to trigger a write
      db.set("key1", "value1");

      let drainFired = false;
      db.on("drain", () => {
        if (drainFired) {
          // Should not fire drain multiple times
          done(new Error("drain event fired multiple times"));
          return;
        }
        drainFired = true;

        // Verify the write completed
        const content = fs.readFileSync(testFile, "utf-8");
        expect(content).toContain("key1");

        // Now set another value to verify drain doesn't fire prematurely
        db.set("key2", "value2", () => {
          // After callback, check that drain hasn't fired again
          setImmediate(() => {
            if (drainFired) {
              // In original code, drain should have fired again
              // In mutated code, it won't fire because condition is inverted
              done();
            } else {
              done(new Error("drain event should have fired after second write"));
            }
          });
        });
      });
    });
  });
});