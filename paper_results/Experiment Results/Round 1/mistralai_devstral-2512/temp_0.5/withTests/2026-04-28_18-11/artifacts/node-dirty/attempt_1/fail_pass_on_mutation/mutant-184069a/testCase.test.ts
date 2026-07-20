import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from "fs";
import path from "path";
import rimraf from "rimraf";

describe("test for ENOENT error handling", () => {
  const testFile = path.join(__dirname, "tmp", "nonexistent.dirty");

  beforeEach(() => {
    rimraf.sync(path.dirname(testFile));
    fs.mkdirSync(path.dirname(testFile), { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(path.dirname(testFile));
  });

  it("should emit load event with 0 when file does not exist", (done) => {
    const db = new Dirty(testFile);
    db.on("load", (length) => {
      expect(length).toBe(0);
      done();
    });
  });
});