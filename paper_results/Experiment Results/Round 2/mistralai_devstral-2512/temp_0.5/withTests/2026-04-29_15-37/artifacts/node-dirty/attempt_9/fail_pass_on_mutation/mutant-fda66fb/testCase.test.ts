import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("test drain event with rapid writes", () => {
  const testFile = path.join(__dirname, "test-rapid-writes.dirty");

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  it("should emit drain after all rapid writes complete", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      let drainCount = 0;
      db.on("drain", () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify all writes completed
          expect(fs.existsSync(testFile)).toBe(true);
          const content = fs.readFileSync(testFile, "utf-8");
          const lines = content.trim().split("\n");
          expect(lines.length).toBe(5);

          // Now test the critical behavior: setting another value after drain
          // This should trigger another flush cycle
          db.set("key6", "value6");

          // The drain should fire again for the sixth write
          setTimeout(() => {
            expect(drainCount).toBe(2);
            const updatedContent = fs.readFileSync(testFile, "utf-8");
            const updatedLines = updatedContent.trim().split("\n");
            expect(updatedLines.length).toBe(6);
            expect(updatedLines[5]).toContain("key6");
            done();
          }, 100);
        }
      });

      // Rapidly set multiple values
      db.set("key1", "value1");
      db.set("key2", "value2");
      db.set("key3", "value3");
      db.set("key4", "value4");
      db.set("key5", "value5");
    });
  }, 5000);
});