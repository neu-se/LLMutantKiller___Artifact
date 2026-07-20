import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("test write stream drain handling", () => {
  const testFile = path.join(__dirname, "test-drain-handling.dirty");
  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should correctly handle drain when queue is empty", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      // Set a value to trigger a write
      db.set("key1", "value1", () => {
        // Immediately check if drain is emitted correctly
        db.on("drain", () => {
          // Verify the write happened
          expect(fs.existsSync(testFile)).toBe(true);
          const content = fs.readFileSync(testFile, "utf-8");
          expect(content).toContain("key1");
          done();
        });
      });
    });
  });
});