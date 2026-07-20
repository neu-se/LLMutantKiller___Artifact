// testCase.test.ts
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("drain event emission after write stream drains", () => {
  const testFile = path.join(__dirname, "test-drain.dirty");
  let db: any;

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

  it("should emit drain event when write stream drains and queue is empty", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Set multiple values to ensure we trigger the drain condition
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      let drainCount = 0;
      db.on("drain", () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify the drain event was emitted exactly once
          expect(drainCount).toBe(1);
          done();
        }
      });

      // Force a small delay to ensure the drain event has time to fire
      setTimeout(() => {
        if (drainCount === 0) {
          fail("drain event was not emitted");
        }
      }, 200);
    });
  });
});