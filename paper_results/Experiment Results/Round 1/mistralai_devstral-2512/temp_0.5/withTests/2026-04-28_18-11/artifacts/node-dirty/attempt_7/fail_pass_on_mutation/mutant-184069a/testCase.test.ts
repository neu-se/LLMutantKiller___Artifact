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

  it("should only emit load event for non-existent file (ENOENT case)", (done) => {
    const db = new Dirty(testFile);
    const events: string[] = [];

    db.on("load", (length) => {
      events.push("load");
      expect(length).toBe(0);
    });

    db.on("error", (err) => {
      events.push("error");
      if (err.code === "ENOENT") {
        done(new Error("Original code should not emit ENOENT error"));
      }
    });

    setTimeout(() => {
      expect(events).toEqual(["load"]);
      done();
    }, 100);
  });
});