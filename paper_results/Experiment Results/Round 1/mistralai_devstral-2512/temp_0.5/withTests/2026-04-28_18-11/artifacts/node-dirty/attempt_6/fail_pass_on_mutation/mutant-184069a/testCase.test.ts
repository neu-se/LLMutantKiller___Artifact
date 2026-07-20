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

  it("should emit load event but not error event for ENOENT", (done) => {
    const db = new Dirty(testFile);
    let loadEventReceived = false;
    let errorEventReceived = false;

    db.on("load", (length) => {
      loadEventReceived = true;
      expect(length).toBe(0);
    });

    db.on("error", (err) => {
      errorEventReceived = true;
      if (err.code === "ENOENT") {
        done(new Error("Original code should not emit ENOENT error"));
      }
    });

    setTimeout(() => {
      expect(loadEventReceived).toBe(true);
      expect(errorEventReceived).toBe(false);
      done();
    }, 100);
  });
});