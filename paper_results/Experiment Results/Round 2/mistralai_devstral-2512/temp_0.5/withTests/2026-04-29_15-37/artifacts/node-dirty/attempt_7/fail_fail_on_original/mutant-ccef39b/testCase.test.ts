import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("close behavior mutation test", () => {
  const testFile = path.join(__dirname, "test-close-mutation.dirty");
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

  it("should handle close when queue has items but no in-flight writes", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Add items to queue
      db.set("key1", "value1");
      db.set("key2", "value2");

      // Wait for writes to complete
      db.once("drain", () => {
        // Add more items to queue (no in-flight writes now)
        db.set("key3", "value3");

        // Track events
        let drainCalled = false;
        let writeCloseCalled = false;

        db.once("drain", () => {
          drainCalled = true;
          if (writeCloseCalled) {
            done(new Error("Mutation detected - drain called after write_close"));
          }
        });

        db.once("write_close", () => {
          writeCloseCalled = true;
          if (!drainCalled) {
            done();
          }
        });

        // Close immediately
        db.close();
      });
    });
  });
});