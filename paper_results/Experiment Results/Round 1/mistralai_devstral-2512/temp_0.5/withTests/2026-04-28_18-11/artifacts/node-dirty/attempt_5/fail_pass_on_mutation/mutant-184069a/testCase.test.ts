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

  it("should NOT emit error event when file does not exist (ENOENT)", (done) => {
    const db = new Dirty(testFile);
    let errorCount = 0;

    db.on("error", (err) => {
      errorCount++;
      if (err.code === "ENOENT") {
        done(new Error("Original code should not emit ENOENT error"));
      }
    });

    db.on("load", () => {
      setTimeout(() => {
        expect(errorCount).toBe(0);
        done();
      }, 50);
    });
  });
});