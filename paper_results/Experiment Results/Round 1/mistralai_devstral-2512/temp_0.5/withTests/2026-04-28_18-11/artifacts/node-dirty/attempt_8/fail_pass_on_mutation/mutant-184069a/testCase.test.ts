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

  it("should emit load event with 0 for non-existent file and not emit any error", (done) => {
    const db = new Dirty(testFile);
    let loadFired = false;
    let errorFired = false;

    db.on("load", (length) => {
      loadFired = true;
      expect(length).toBe(0);
    });

    db.on("error", (err) => {
      errorFired = true;
      // This should never be called for ENOENT in original code
      expect(err.code).not.toBe("ENOENT");
    });

    setTimeout(() => {
      expect(loadFired).toBe(true);
      expect(errorFired).toBe(false);
      done();
    }, 100);
  });
});