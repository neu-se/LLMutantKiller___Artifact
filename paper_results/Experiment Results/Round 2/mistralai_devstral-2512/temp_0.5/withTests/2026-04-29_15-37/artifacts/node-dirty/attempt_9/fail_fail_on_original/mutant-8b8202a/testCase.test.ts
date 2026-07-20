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

  it("should not emit drain event when writes are still in flight", (done) => {
    const db = new Dirty(testFile);
    let drainEmitted = false;
    let writeCallbackCalled = false;

    db.on("load", () => {
      // Set up drain listener
      db.on("drain", () => {
        drainEmitted = true;
      });

      // Perform a write with callback
      db.set("key1", "value1", () => {
        writeCallbackCalled = true;

        // Check immediately after write callback
        // In original code, drain should NOT be emitted yet because
        // _inFlightWrites > 0 and _waitForDrain is false
        // In mutated code, drain will be emitted immediately when _waitForDrain becomes false
        if (writeCallbackCalled && !drainEmitted) {
          // Wait a bit to ensure drain isn't emitted
          setTimeout(() => {
            expect(drainEmitted).toBe(false);
            done();
          }, 50);
        }
      });
    });
  });
});