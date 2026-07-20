import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("drain event emission with inFlightWrites", () => {
  const testFile = path.join(__dirname, "test-drain-inflight.dirty");

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it("should emit drain when inFlightWrites reaches zero with empty queue", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      let drainFired = false;
      db.on("drain", () => {
        drainFired = true;
      });

      // Set a value to trigger a write
      db.set("key1", "value1", () => {
        // After write completes, drain should have fired
        setImmediate(() => {
          expect(drainFired).toBe(true);

          // Now manually trigger the drain condition by forcing inFlightWrites to zero
          // This simulates the condition in the _writeStream drain handler
          (db as any)._inFlightWrites = 0;
          (db as any)._waitForDrain = false;

          // Clear the queue to match the condition
          (db as any)._queue.clear();

          // In original code, this should emit drain again
          // In mutated code, it won't because the condition is inverted
          drainFired = false;
          (db as any)._writeStream.emit("drain");

          setImmediate(() => {
            expect(drainFired).toBe(true);
            done();
          });
        });
      });
    });
  });
});