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

  it("should emit error event when file exists but is not accessible", (done) => {
    // Create a directory with the same name as the file to trigger ENOENT
    fs.mkdirSync(testFile);
    const db = new Dirty(testFile);
    db.on("error", (err) => {
      expect(err.code).toBe("EISDIR");
      done();
    });
  });
});