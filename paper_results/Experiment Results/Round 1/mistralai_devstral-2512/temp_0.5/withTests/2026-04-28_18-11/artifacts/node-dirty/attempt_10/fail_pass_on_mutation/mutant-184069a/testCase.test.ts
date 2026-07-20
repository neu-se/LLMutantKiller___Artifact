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

  it("should not emit error event for ENOENT when file doesn't exist", (done) => {
    const db = new Dirty(testFile);
    let hasError = false;

    db.on("error", (err) => {
      hasError = true;
      if (err.code === "ENOENT") {
        done(new Error("Original code should not emit ENOENT error"));
      }
    });

    db.on("load", () => {
      setTimeout(() => {
        expect(hasError).toBe(false);
        done();
      }, 50);
    });
  });
});