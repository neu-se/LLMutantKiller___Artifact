import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from "fs";
import path from "path";

describe("test for ENOENT error handling", () => {
  const testFile = path.join(__dirname, "tmp", "nonexistent.dirty");

  beforeEach(() => {
    // Ensure the directory exists but the file doesn't
    const dir = path.dirname(testFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // Remove the file if it exists
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    // Clean up the test file if it was created
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it("should emit load event with 0 when file does not exist (ENOENT)", (done) => {
    const db = new Dirty(testFile);
    db.on("load", (length) => {
      expect(length).toBe(0);
      done();
    });
    // This should NOT emit an error event for ENOENT
    db.on("error", (err) => {
      if (err.code === "ENOENT") {
        done(new Error("Should not emit error for ENOENT"));
      }
    });
  });
});