import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("dirty database file parsing", () => {
  const testFile = path.join(__dirname, "test.dirty");

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should correctly handle empty lines in database file", (done) => {
    // Create a test file with an empty line (which should trigger the error)
    const writeStream = fs.createWriteStream(testFile);
    writeStream.write('{"key":"test1","val":"value1"}\n');
    writeStream.write('\n'); // Empty line that should trigger error
    writeStream.write('{"key":"test2","val":"value2"}\n');
    writeStream.end(() => {
      const db = new Dirty(testFile);
      db.on("error", (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toContain("Empty lines never appear in a healthy database");
        done();
      });
    });
  });
});