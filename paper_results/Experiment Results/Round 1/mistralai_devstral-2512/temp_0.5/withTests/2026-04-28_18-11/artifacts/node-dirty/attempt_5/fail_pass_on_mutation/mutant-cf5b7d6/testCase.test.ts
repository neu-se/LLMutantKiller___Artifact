import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("dirty database file parsing", () => {
  const testFile = path.join(__dirname, "test.dirty");

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should correctly handle malformed JSON rows during parsing", (done) => {
    // Create a test file with a malformed JSON row
    const writeStream = fs.createWriteStream(testFile);
    writeStream.write('{"key":"test1","val":"value1"}\n');
    writeStream.write('{"key":"test2"}\n'); // Missing val field
    writeStream.end(() => {
      const db = new Dirty(testFile);
      db.on("load", (size) => {
        // In original code, malformed rows are skipped and return ''
        // In mutated code, they return "Stryker was here!" which affects parsing
        expect(size).toBe(1); // Only test1 should be loaded
        expect(db.get("test1")).toBe("value1");
        expect(db.get("test2")).toBeUndefined();

        done();
      });
    });
  });
});