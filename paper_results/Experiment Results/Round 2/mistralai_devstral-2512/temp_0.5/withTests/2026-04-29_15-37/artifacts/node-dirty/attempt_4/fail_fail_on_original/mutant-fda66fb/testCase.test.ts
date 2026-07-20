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
      // Set a value to trigger a write
      db.set("key1", "value1", () => {
        // At this point the queue should be empty
        // The drain event should fire immediately
        db.on("drain", () => {
          expect(fs.existsSync(testFile)).toBe(true);
          const content = fs.readFileSync(testFile, "utf-8");
          expect(content).toContain("key1");
          done();
        });
      });
    });
  });
});