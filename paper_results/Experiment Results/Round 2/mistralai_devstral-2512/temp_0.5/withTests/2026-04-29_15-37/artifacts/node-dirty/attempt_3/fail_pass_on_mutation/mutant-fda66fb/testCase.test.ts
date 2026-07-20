import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("test write stream drain condition", () => {
  const testFile = path.join(__dirname, "test-drain-condition.dirty");

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, which is fine
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, which is fine
    }
  });

  it("should emit drain when queue becomes empty during flush", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      // Set a value to trigger a write
      db.set("key1", "value1");

      // Set another value immediately
      db.set("key2", "value2");

      // The drain event should fire after both writes complete
      db.on("drain", () => {
        expect(fs.existsSync(testFile)).toBe(true);
        const content = fs.readFileSync(testFile, "utf-8");
        const lines = content.trim().split("\n");
        expect(lines.length).toBe(2);
        expect(lines[0]).toContain("key1");
        expect(lines[1]).toContain("key2");
        done();
      });
    });
  });
});