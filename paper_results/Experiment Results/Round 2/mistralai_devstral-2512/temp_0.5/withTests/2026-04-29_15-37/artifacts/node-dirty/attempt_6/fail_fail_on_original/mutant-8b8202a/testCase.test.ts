import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("drain event emission test", () => {
  const testFile = path.join(__dirname, "test-drain.dirty");

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore if file doesn't exist
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore if file doesn't exist
    }
  });

  it("should not emit drain event when there are still in-flight writes", (done) => {
    const db = new Dirty(testFile);
    let drainEmitted = false;
    let writeCompleted = false;

    db.on("load", () => {
      // Set up drain listener
      db.on("drain", () => {
        drainEmitted = true;
      });

      // Perform a write with callback
      db.set("key1", "value1", () => {
        writeCompleted = true;
      });

      // Check immediately after write completes
      setImmediate(() => {
        // In original code, drain should NOT be emitted yet because
        // _inFlightWrites > 0 and _waitForDrain is false
        // In mutated code, drain will be emitted immediately when _waitForDrain becomes false
        if (writeCompleted && !drainEmitted) {
          done();
        } else {
          done(new Error("drain event was emitted prematurely"));
        }
      });
    });
  });
});