import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("dirty database file parsing", () => {
  const testFile = path.join(__dirname, "test.dirty");

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should correctly handle row parsing and return empty string for valid rows", (done) => {
    // Create a test file with valid data
    const writeStream = fs.createWriteStream(testFile);
    writeStream.write('{"key":"test1","val":"value1"}\n');
    writeStream.write('{"key":"test2","val":"value2"}\n');
    writeStream.end(() => {
      const db = new Dirty(testFile);
      let errorOccurred = false;

      db.on("error", (err) => {
        errorOccurred = true;
        expect(err.message).toBe("Empty lines never appear in a healthy database");
      });

      db.on("load", (size) => {
        // The mutation changes the return value from '' to "Stryker was here!"
        // This causes the row parsing to fail differently
        expect(errorOccurred).toBe(false);
        expect(size).toBe(2);
        expect(db.get("test1")).toBe("value1");
        expect(db.get("test2")).toBe("value2");
        done();
      });
    });
  });
});