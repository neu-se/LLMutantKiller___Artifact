import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("drain event emission test", () => {
  const testFile = path.join(__dirname, "test-drain.dirty");
  let db: Dirty;
  let drainCallbackCalled = false;
  let emptyCallbackCalled = false;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit 'drain' event with correct event name when writes complete", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Force multiple writes to trigger flush
      for (let i = 0; i < 50; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      // Listen for drain event
      db.on("drain", () => {
        drainCallbackCalled = true;
      });

      // Listen for empty string event (mutated version)
      db.on("", () => {
        emptyCallbackCalled = true;
      });

      setTimeout(() => {
        expect(drainCallbackCalled).toBe(true);
        expect(emptyCallbackCalled).toBe(false);
        done();
      }, 100);
    });
  });
});