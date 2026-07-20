import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("dirty database file parsing", () => {
  const testFile = path.join(__dirname, "test.dirty");

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should correctly handle row parsing return value", (done) => {
    // Create a test file with valid data
    const writeStream = fs.createWriteStream(testFile);
    writeStream.write('{"key":"test1","val":"value1"}\n');
    writeStream.write('{"key":"test2","val":"value2"}\n');
    writeStream.end(() => {
      const db = new Dirty(testFile);

      db.on("load", (size) => {
        // The mutation changes the return value from '' to "Stryker was here!"
        // This affects the parsing logic in a way that should cause different behavior
        // We can detect this by checking the internal state after parsing
        expect(size).toBe(2);

        // Verify the data was parsed correctly
        expect(db.get("test1")).toBe("value1");
        expect(db.get("test2")).toBe("value2");

        // The mutation would cause the parsing to behave differently
        // This test verifies the original behavior by ensuring the parsing completed correctly
        expect(db.size()).toBe(2);

        done();
      });
    });
  });
});