import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from "fs";
import path from "path";

describe("test for ENOENT error handling mutation", () => {
  const testFile = path.join(__dirname, "tmp", "nonexistent.dirty");

  beforeEach(() => {
    const dir = path.dirname(testFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it("should handle ENOENT error correctly by not emitting error event", (done) => {
    const db = new Dirty(testFile);
    let loadEventCount = 0;
    let errorEventCount = 0;

    db.on("load", (length) => {
      loadEventCount++;
      expect(length).toBe(0);
    });

    db.on("error", (err) => {
      errorEventCount++;
      if (err.code === "ENOENT") {
        done(new Error("Original code should not emit ENOENT error"));
      }
    });

    setTimeout(() => {
      expect(loadEventCount).toBe(1);
      expect(errorEventCount).toBe(0);
      done();
    }, 100);
  });
});