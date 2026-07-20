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

  it("should correctly parse database file and not return corrupted data", (done) => {
    // Create a test file with valid data
    const testData = [
      { key: "test1", val: "value1" },
      { key: "test2", val: "value2" }
    ];

    const writeStream = fs.createWriteStream(testFile);
    testData.forEach(item => {
      writeStream.write(JSON.stringify(item) + "\n");
    });
    writeStream.end(() => {
      const db2 = new Dirty(testFile);
      db2.on("load", (size) => {
        // Verify the data was loaded correctly
        expect(size).toBe(2);
        expect(db2.get("test1")).toBe("value1");
        expect(db2.get("test2")).toBe("value2");

        // Now test that the parser doesn't return corrupted data
        const fileContent = fs.readFileSync(testFile, 'utf-8');
        const lines = fileContent.trim().split('\n');
        expect(lines.every(line => line === "" || line.startsWith('{'))).toBe(true);

        done();
      });
    });
  });
});