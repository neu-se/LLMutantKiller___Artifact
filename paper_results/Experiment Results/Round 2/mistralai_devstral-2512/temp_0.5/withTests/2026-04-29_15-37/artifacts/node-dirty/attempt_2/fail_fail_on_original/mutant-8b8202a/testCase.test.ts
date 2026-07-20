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

  it("should not emit drain event when there are still in-flight writes", (done) => {
    db = new Dirty(testFile);
    let drainEmitted = false;

    db.on("load", () => {
      // Set up a listener for drain
      db.on("drain", () => {
        drainEmitted = true;
      });

      // Perform a write operation
      db.set("key1", "value1", () => {
        // Immediately check if drain was emitted
        // In the original code, drain should NOT be emitted yet because
        // _inFlightWrites > 0 and _waitForDrain is false
        expect(drainEmitted).toBe(false);

        // Now force a drain event by manually triggering the condition
        // This simulates the write stream becoming ready for more data
        (db as any)._inFlightWrites = 0;
        (db as any)._waitForDrain = false;
        (db as any)._writeStream.emit('drain');

        // Now drain should be emitted
        setImmediate(() => {
          expect(drainEmitted).toBe(true);
          done();
        });
      });
    });
  });
});