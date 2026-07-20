import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("dirty database file parsing", () => {
  const testFile = path.join(__dirname, "test.dirty");

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should correctly parse database rows and maintain data integrity", (done) => {
    // Create a test file with valid data
    const writeStream = fs.createWriteStream(testFile);
    writeStream.write('{"key":"test1","val":"value1"}\n');
    writeStream.write('{"key":"test2","val":"value2"}\n');
    writeStream.end(() => {
      const db = new Dirty(testFile);
      db.on("load", (size) => {
        // Verify the data was loaded correctly
        expect(size).toBe(2);
        expect(db.get("test1")).toBe("value1");
        expect(db.get("test2")).toBe("value2");

        // The mutation changes the return value in the parsing loop
        // This affects how the buffer is processed
        // We can detect this by checking if the parsing completed correctly
        expect(db.size()).toBe(2);

        // Now test that we can write new data without corruption
        db.set("test3", "value3", () => {
          expect(db.get("test3")).toBe("value3");
          expect(db.size()).toBe(3);
          done();
        });
      });
    });
  });
});