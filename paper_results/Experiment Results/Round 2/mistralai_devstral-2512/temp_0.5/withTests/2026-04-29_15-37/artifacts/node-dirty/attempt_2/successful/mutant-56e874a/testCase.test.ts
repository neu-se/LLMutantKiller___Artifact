import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("test-flush-condition", () => {
  const testFile = path.join(__dirname, "test-flush-condition.dirty");
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should not flush when _waitForDrain is true", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Force _waitForDrain to be true by filling the write buffer
      const largeValue = "x".repeat(1024 * 1024); // 1MB string
      db.set("key1", largeValue);

      // Immediately try to set another value
      db.set("key2", "value2");

      // Check that key2 is not written to disk yet
      setImmediate(() => {
        const contents = fs.readFileSync(testFile, "utf-8");
        const lines = contents.trim().split("\n");
        expect(lines.length).toBe(1);
        expect(JSON.parse(lines[0]).key).toBe("key1");
        done();
      });
    });
  });
});