import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("test flush behavior with waitForDrain", () => {
  const testFile = path.join(__dirname, "test-waitForDrain.dirty");
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should continue flushing when waitForDrain becomes false", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Set multiple keys to trigger flush multiple times
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      // Force waitForDrain to be true initially
      (db as any)._waitForDrain = true;

      // Manually trigger drain after a short delay
      setImmediate(() => {
        (db as any)._waitForDrain = false;
        (db as any)._flush();
      });

      db.on("drain", () => {
        // Verify all items were written
        const contents = fs.readFileSync(testFile, "utf-8");
        const lines = contents.trim().split("\n");
        expect(lines.length).toBe(3);
        done();
      });
    });
  });
});