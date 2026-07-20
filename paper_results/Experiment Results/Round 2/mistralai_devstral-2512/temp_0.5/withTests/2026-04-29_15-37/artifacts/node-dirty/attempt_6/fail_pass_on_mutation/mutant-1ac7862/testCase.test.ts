import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("test flush behavior with waitForDrain condition", () => {
  const testFile = path.join(__dirname, "test-waitForDrain.dirty");
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

  it("should break flush loop when waitForDrain is true", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Queue multiple writes
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      // Force _waitForDrain to be true
      db._waitForDrain = true;

      // Manually trigger flush
      db._flush();

      // In mutated code, the loop will break immediately
      // In original code, it will process all writes
      setTimeout(() => {
        // Check if all writes were processed
        const contents = fs.readFileSync(testFile, "utf-8");
        const lines = contents.trim().split("\n");

        // Original code should have all 3 writes
        // Mutated code will have fewer writes
        expect(lines.length).toBe(3);

        // Verify each write
        expect(db.get("key1")).toBe("value1");
        expect(db.get("key2")).toBe("value2");
        expect(db.get("key3")).toBe("value3");
        done();
      }, 100);
    });
  });
});