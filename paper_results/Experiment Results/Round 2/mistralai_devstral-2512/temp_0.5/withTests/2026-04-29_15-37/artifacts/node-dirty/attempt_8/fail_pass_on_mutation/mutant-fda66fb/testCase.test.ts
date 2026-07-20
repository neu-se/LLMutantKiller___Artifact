import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("test drain event with empty queue", () => {
  const testFile = path.join(__dirname, "test-empty-queue.dirty");

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  it("should emit drain when queue is empty after write completes", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      let drainCount = 0;
      db.on("drain", () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify the write completed
          expect(fs.existsSync(testFile)).toBe(true);
          const content = fs.readFileSync(testFile, "utf-8");
          expect(content).toContain("key1");

          // Now test the critical behavior: setting another value after drain
          // This should trigger another flush cycle
          db.set("key2", "value2");

          // The drain should fire again for the second write
          setTimeout(() => {
            expect(drainCount).toBe(2);
            const updatedContent = fs.readFileSync(testFile, "utf-8");
            expect(updatedContent).toContain("key2");
            done();
          }, 100);
        }
      });

      // Set initial value
      db.set("key1", "value1");
    });
  }, 5000);
});