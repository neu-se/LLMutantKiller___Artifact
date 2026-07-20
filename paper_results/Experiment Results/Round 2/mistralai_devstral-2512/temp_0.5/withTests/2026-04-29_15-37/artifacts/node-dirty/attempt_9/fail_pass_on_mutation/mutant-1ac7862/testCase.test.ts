import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("test flush loop break condition", () => {
  const testFile = path.join(__dirname, "test-loop-break.dirty");
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

  it("should not break flush loop when waitForDrain is false", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Queue multiple writes
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      // Ensure _waitForDrain is false so loop should not break
      db._waitForDrain = false;

      // Manually trigger flush
      db._flush();

      // Check if all writes were processed
      setTimeout(() => {
        const contents = fs.readFileSync(testFile, "utf-8");
        const lines = contents.trim().split("\n");

        // Original code should process all 3 writes (length = 3)
        // Mutated code (if true) would break immediately (length < 3)
        expect(lines.length).toBeGreaterThan(1);

        // Verify at least some writes were processed
        expect(db.size()).toBeGreaterThan(0);
        done();
      }, 100);
    });
  });
});