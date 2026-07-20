import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("dirty database file parsing", () => {
  const testFile = path.join(__dirname, "test.dirty");
  const db = new Dirty(testFile);

  beforeAll((done) => {
    db.on("load", () => {
      done();
    });
  });

  afterAll(() => {
    rimraf.sync(testFile);
  });

  it("should correctly parse database file without corruption", (done) => {
    const testData = [
      { key: "test1", val: "value1" },
      { key: "test2", val: "value2" },
      { key: "test3", val: "value3" }
    ];

    // Write test data to file
    const writeStream = fs.createWriteStream(testFile);
    testData.forEach(item => {
      writeStream.write(JSON.stringify(item) + "\n");
    });
    writeStream.end(() => {
      // Create new instance to load the data
      const db2 = new Dirty(testFile);
      db2.on("load", (size) => {
        expect(size).toBe(3);
        expect(db2.get("test1")).toBe("value1");
        expect(db2.get("test2")).toBe("value2");
        expect(db2.get("test3")).toBe("value3");
        done();
      });
    });
  });
});