import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("test drain event emission", () => {
  const testFile = path.join(__dirname, "test-drain-emission.dirty");

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
          // First drain should occur after initial writes
          expect(fs.existsSync(testFile)).toBe(true);
          const content = fs.readFileSync(testFile, "utf-8");
          expect(content).toContain("key1");
          expect(content).toContain("key2");

          // Now test the critical behavior: setting another value after drain
          db.set("key3", "value3");

          // This should trigger another drain event
          setTimeout(() => {
            expect(drainCount).toBe(2);
            const updatedContent = fs.readFileSync(testFile, "utf-8");
            expect(updatedContent).toContain("key3");
            done();
          }, 100);
        }
      });

      // Set initial values
      db.set("key1", "value1");
      db.set("key2", "value2");
    });
  }, 10000);
});