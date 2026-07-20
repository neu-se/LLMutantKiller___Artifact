import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("dirty database file parsing", () => {
  const testFile = path.join(__dirname, "test.dirty");

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should correctly parse database rows and handle return values", (done) => {
    // Create a test file with valid data
    const writeStream = fs.createWriteStream(testFile);
    writeStream.write('{"key":"test1","val":"value1"}\n');
    writeStream.write('{"key":"test2","val":"value2"}\n');
    writeStream.end(() => {
      const db = new Dirty(testFile);

      db.on("load", (size) => {
        // The mutation changes the return value from '' to "Stryker was here!"
        // This affects how the buffer is processed in the parsing loop
        // We can detect this by verifying the final state matches expectations
        expect(size).toBe(2);

        // Verify the data was parsed correctly
        expect(db.get("test1")).toBe("value1");
        expect(db.get("test2")).toBe("value2");

        // The mutation would cause the parsing to behave differently
        // This test verifies the original behavior by ensuring the parsing completed correctly
        expect(db.size()).toBe(2);

        // Now test that we can write new data without issues
        db.set("test3", "value3", () => {
          expect(db.get("test3")).toBe("value3");
          expect(db.size()).toBe(3);
          done();
        });
      });
    });
  });
});