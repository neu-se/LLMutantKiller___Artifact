import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("close behavior mutation test", () => {
  const testFile = path.join(__dirname, "test-close-mutation.dirty");
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should close immediately when only queue has items (no in-flight writes)", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Add items to queue
      db.set("key1", "value1");
      db.set("key2", "value2");

      // Wait for writes to complete
      db.once("drain", () => {
        // Add more items to queue (no in-flight writes now)
        db.set("key3", "value3");

        // Close immediately - original code should close (queue.size OR inFlightWrites > 0)
        // Mutated code should wait (queue.size AND inFlightWrites > 0)
        const startTime = Date.now();
        db.close();

        // In original code, should emit write_close quickly
        // In mutated code, will wait for drain first
        db.on("write_close", () => {
          const elapsed = Date.now() - startTime;
          if (elapsed > 100) {
            done(new Error("Took too long - mutation detected"));
          } else {
            done();
          }
        });

        // Timeout to catch mutated behavior
        setTimeout(() => {
          done(new Error("Timeout - mutation detected"));
        }, 200);
      });
    });
  });
});