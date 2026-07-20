import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("close behavior with queue but no in-flight writes", () => {
  const testFile = path.join(__dirname, "test-close-queue-only.dirty");
  let db: any;

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, ignore error
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, ignore error
    }
  });

  it("should close immediately when queue has items but no in-flight writes", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Add items to queue
      db.set("key1", "value1");
      db.set("key2", "value2");

      // Wait for writes to complete
      db.once("drain", () => {
        // Add more items to queue (no in-flight writes now)
        db.set("key3", "value3");

        // Track if drain is called
        let drainCalled = false;
        db.once("drain", () => {
          drainCalled = true;
        });

        // Close immediately
        db.close();

        // In original code: should emit write_close without waiting for drain
        // In mutated code: will wait for drain first
        db.on("write_close", () => {
          if (drainCalled) {
            done(new Error("Mutation detected - drain was called before write_close"));
          } else {
            done();
          }
        });
      });
    });
  });
});