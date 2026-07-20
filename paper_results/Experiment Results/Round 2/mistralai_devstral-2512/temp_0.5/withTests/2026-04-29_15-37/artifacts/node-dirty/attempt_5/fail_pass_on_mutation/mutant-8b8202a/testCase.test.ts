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

  it("should emit drain event only when all writes are complete and queue is empty", (done) => {
    const db = new Dirty(testFile);
    let drainCount = 0;

    db.on("load", () => {
      // Perform multiple writes
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      // Track drain events
      db.on("drain", () => {
        drainCount++;

        // In original code, drain should only be emitted once after all writes complete
        // In mutated code, it will emit multiple times because of the "if (true)" condition
        if (drainCount > 1) {
          done(new Error("drain event emitted multiple times"));
        }

        // Verify all writes completed
        setImmediate(() => {
          expect(drainCount).toBe(1);
          const content = fs.readFileSync(testFile, "utf-8");
          const lines = content.trim().split("\n");
          expect(lines.length).toBe(3);
          done();
        });
      });
    });
  });
});