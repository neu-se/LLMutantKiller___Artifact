import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("test write stream drain handling", () => {
  const testFile = path.join(__dirname, "test-drain-handling.dirty");

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  it("should correctly handle drain when queue is empty during flush", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      // Set multiple values to ensure we test the flush behavior
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");

      // Listen for drain event
      db.on("drain", () => {
        // Verify all writes completed
        expect(fs.existsSync(testFile)).toBe(true);
        const content = fs.readFileSync(testFile, "utf-8");
        const lines = content.trim().split("\n");
        expect(lines.length).toBe(3);

        // Now test the critical behavior: setting another value after drain
        // This should trigger another flush cycle
        db.set("key4", "value4");

        db.on("drain", () => {
          const updatedContent = fs.readFileSync(testFile, "utf-8");
          const updatedLines = updatedContent.trim().split("\n");
          expect(updatedLines.length).toBe(4);
          expect(updatedLines[3]).toContain("key4");
          done();
        });
      });
    });
  }, 10000);
});