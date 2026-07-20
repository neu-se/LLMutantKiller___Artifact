import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";

describe("test drain event timing", () => {
  const testFile = path.join(__dirname, "test-drain-timing.dirty");

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  it("should emit drain immediately when queue is empty", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      let drainFired = false;
      const drainTimeout = setTimeout(() => {
        if (!drainFired) {
          done(new Error("Drain event did not fire in expected time"));
        }
      }, 1000);

      db.on("drain", () => {
        clearTimeout(drainTimeout);
        if (drainFired) return;
        drainFired = true;

        // Verify the write completed
        expect(fs.existsSync(testFile)).toBe(true);
        const content = fs.readFileSync(testFile, "utf-8");
        expect(content).toContain("key1");

        // Now test the critical behavior: setting another value immediately after drain
        // This should trigger another flush cycle
        db.set("key2", "value2");

        // The drain should fire again for the second write
        setTimeout(() => {
          const updatedContent = fs.readFileSync(testFile, "utf-8");
          expect(updatedContent).toContain("key2");
          done();
        }, 100);
      });

      // Set initial value
      db.set("key1", "value1");
    });
  }, 5000);
});