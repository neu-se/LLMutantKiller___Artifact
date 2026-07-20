import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("dirty database file parsing", () => {
  const testFile = path.join(__dirname, "test.dirty");

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should correctly parse database rows and maintain buffer state", (done) => {
    // Create a test file with multiple rows
    const writeStream = fs.createWriteStream(testFile);
    writeStream.write('{"key":"test1","val":"value1"}\n');
    writeStream.write('{"key":"test2","val":"value2"}\n');
    writeStream.write('{"key":"test3","val":"value3"}\n');
    writeStream.end(() => {
      const db = new Dirty(testFile);

      db.on("load", (size) => {
        // The mutation changes the return value in the parsing loop
        // This affects how the buffer is processed and cleared
        // We can detect this by verifying the final state
        expect(size).toBe(3);
        expect(db.get("test1")).toBe("value1");
        expect(db.get("test2")).toBe("value2");
        expect(db.get("test3")).toBe("value3");

        // Verify no corruption occurred during parsing
        expect(db.size()).toBe(3);

        // Now test that we can add new data
        db.set("test4", "value4", () => {
          expect(db.get("test4")).toBe("value4");
          expect(db.size()).toBe(4);
          done();
        });
      });
    });
  });
});