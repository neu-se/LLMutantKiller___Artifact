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
      // Set a value to trigger write
      db.set("testKey", "testValue");

      let drainEmitted = false;
      db.on("drain", () => {
        drainEmitted = true;
      });

      // Check after a short delay if drain was emitted
      setTimeout(() => {
        expect(drainEmitted).toBe(true);
        done();
      }, 100);
    });
  }, 1000);
});