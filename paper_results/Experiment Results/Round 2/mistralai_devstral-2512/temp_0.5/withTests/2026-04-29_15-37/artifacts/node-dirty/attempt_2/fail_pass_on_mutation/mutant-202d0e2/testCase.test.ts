// testCase.test.ts
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("drain event emission after write stream drains", () => {
  const testFile = path.join(__dirname, "test-drain.dirty");
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit drain event when write stream drains and queue is empty", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Fill the write buffer to trigger drain
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      let drainCount = 0;
      db.on("drain", () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify that drain was emitted
          expect(drainCount).toBe(1);
          done();
        }
      });
    });
  });
});