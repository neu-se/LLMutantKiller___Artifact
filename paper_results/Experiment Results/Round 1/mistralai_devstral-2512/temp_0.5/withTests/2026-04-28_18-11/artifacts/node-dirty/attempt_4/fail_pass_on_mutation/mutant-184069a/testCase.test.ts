import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from "fs";
import path from "path";

describe("test for ENOENT error handling", () => {
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

  it("should emit load event with 0 when file does not exist and NOT emit error for ENOENT", (done) => {
    const db = new Dirty(testFile);
    let loadFired = false;
    let errorFired = false;

    db.on("load", (length) => {
      loadFired = true;
      expect(length).toBe(0);
      // Give time for potential error event
      setTimeout(() => {
        expect(errorFired).toBe(false);
        done();
      }, 10);
    });

    db.on("error", (err) => {
      if (err.code === "ENOENT") {
        errorFired = true;
      }
    });
  });
});