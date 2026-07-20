import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("Empty line handling in database file", () => {
  const testFilePath = path.join(__dirname, "test-empty-line.dirty");
  let db: Dirty;

  beforeEach(() => {
    // Create a test file with an empty line
    fs.writeFileSync(testFilePath, '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n');
  });

  afterEach(() => {
    rimraf.sync(testFilePath);
  });

  it("should emit an error when encountering an empty line in the database file", (done) => {
    db = new Dirty(testFilePath);
    db.on("error", (err) => {
      expect(err.message).toBe("Empty lines never appear in a healthy database");
      done();
    });
  });
});