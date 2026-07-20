import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("test flush loop execution", () => {
  const testFile = path.join(__dirname, "test-flush-execution.dirty");
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

  it("should execute flush loop completely when waitForDrain is false", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Queue multiple writes
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      // Ensure _waitForDrain is false
      db._waitForDrain = false;

      // Manually trigger flush
      db._flush();

      // Check if all writes were processed
      setTimeout(() => {
        const contents = fs.readFileSync(testFile, "utf-8");
        const lines = contents.trim().split("\n");

        // Original code should process all 3 writes
        // Mutated code (if true) would break immediately
        expect(lines.length).toBe(3);

        // Verify all values were written
        expect(db.get("key1")).toBe("value1");
        expect(db.get("key2")).toBe("value2");
        expect(db.get("key3")).toBe("value3");
        done();
      }, 100);
    });
  });
});