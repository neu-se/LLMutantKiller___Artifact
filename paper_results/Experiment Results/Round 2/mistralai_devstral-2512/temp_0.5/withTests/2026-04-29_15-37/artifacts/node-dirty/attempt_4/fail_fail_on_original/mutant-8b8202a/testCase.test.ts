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

    db.on("load", () => {
      // Set up drain listener
      db.on("drain", () => {
        drainEmitted = true;
      });

      // Perform multiple writes
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      // Immediately check if drain was emitted (should be false)
      setImmediate(() => {
        expect(drainEmitted).toBe(false);

        // Now wait a bit more to ensure drain isn't emitted prematurely
        setTimeout(() => {
          // In original code, drain should only be emitted after all writes complete
          // In mutated code, it will emit immediately when _waitForDrain becomes false
          expect(drainEmitted).toBe(false);
          done();
        }, 100);
      });
    });
  });
});