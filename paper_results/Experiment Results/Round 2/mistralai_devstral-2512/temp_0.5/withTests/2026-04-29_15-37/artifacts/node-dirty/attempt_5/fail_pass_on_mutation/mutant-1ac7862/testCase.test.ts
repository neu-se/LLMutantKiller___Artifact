import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("test flush behavior with multiple writes", () => {
  const testFile = path.join(__dirname, "test-flush.dirty");
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

  it("should process all queued writes when _waitForDrain is false", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Queue multiple writes
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      // Force _waitForDrain to be true initially
      db._waitForDrain = true;

      // Manually trigger flush after setting _waitForDrain to false
      setImmediate(() => {
        db._waitForDrain = false;
        db._flush();
      });

      // Verify all writes complete
      setTimeout(() => {
        expect(db.get("key1")).toBe("value1");
        expect(db.get("key2")).toBe("value2");
        expect(db.get("key3")).toBe("value3");

        // Verify file contents
        const contents = fs.readFileSync(testFile, "utf-8");
        const lines = contents.trim().split("\n");
        expect(lines.length).toBe(3);
        done();
      }, 100);
    });
  });
});