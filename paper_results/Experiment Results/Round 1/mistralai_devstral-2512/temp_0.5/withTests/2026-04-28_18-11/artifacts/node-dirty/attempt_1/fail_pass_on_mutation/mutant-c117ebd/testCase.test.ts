import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("encoding mutation test", () => {
  const testFile = path.join(__dirname, "test-encoding.dirty");
  beforeEach(() => {
    rimraf.sync(testFile);
  });
  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should correctly write and read UTF-8 encoded data", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      // Test with a string containing non-ASCII characters
      const testKey = "test";
      const testValue = "café";
      db.set(testKey, testValue, () => {
        // Verify the file contains the correct UTF-8 encoded data
        const fileContents = fs.readFileSync(testFile, "utf-8");
        const expectedLine = JSON.stringify({ key: testKey, val: testValue }) + "\n";
        expect(fileContents).toBe(expectedLine);

        // Create a new instance to verify reading works correctly
        const db2 = new Dirty(testFile);
        db2.on("load", () => {
          expect(db2.get(testKey)).toBe(testValue);
          done();
        });
      });
    });
  });
});