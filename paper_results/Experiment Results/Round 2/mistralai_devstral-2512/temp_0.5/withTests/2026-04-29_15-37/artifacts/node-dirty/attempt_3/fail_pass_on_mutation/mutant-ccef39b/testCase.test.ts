import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("close behavior with queue but no in-flight writes", () => {
  const testFile = path.join(__dirname, "test-close-queue.dirty");
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should close immediately when queue has items but no in-flight writes", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Add items to queue
      db.set("key1", "value1");
      db.set("key2", "value2");

      // Force flush to complete writes
      db.once("drain", () => {
        // Now queue is empty but we'll add more items
        db.set("key3", "value3");

        // Close immediately - should not wait for drain since inFlightWrites is 0
        db.close();

        // Should emit write_close without waiting for another drain
        db.on("write_close", () => {
          done();
        });
      });
    });
  });
});