import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("test flush behavior with waitForDrain mutation", () => {
  const testFile = path.join(__dirname, "test-mutation.dirty");
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

  it("should process all queued writes when waitForDrain is false", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Queue multiple writes
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      // Force _waitForDrain to be false to trigger the mutation difference
      db._waitForDrain = false;

      // Manually trigger flush
      db._flush();

      // Check immediately - the mutation would break the loop immediately
      setTimeout(() => {
        // In original code, all writes should be processed
        // In mutated code (if true), the loop breaks immediately
        const contents = fs.readFileSync(testFile, "utf-8");
        const lines = contents.trim().split("\n");

        // Original code should have all 3 writes
        expect(lines.length).toBe(3);

        // Verify each write was processed
        expect(db.get("key1")).toBe("value1");
        expect(db.get("key2")).toBe("value2");
        expect(db.get("key3")).toBe("value3");
        done();
      }, 50);
    });
  });
});