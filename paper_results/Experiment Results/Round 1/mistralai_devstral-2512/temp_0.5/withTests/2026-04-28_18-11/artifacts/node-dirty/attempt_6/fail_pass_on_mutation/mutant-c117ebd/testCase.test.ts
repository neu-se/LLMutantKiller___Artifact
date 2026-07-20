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

  it("should correctly handle UTF-8 encoded data", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      // Test with a string that would be corrupted with empty encoding
      const testKey = "test";
      const testValue = "café";
      db.set(testKey, testValue, () => {
        // Read the file with UTF-8 encoding
        const fileContents = fs.readFileSync(testFile, 'utf-8');
        // Verify the content is valid JSON
        const lines = fileContents.trim().split('\n');
        expect(lines.length).toBeGreaterThan(0);
        const parsed = JSON.parse(lines[0]);
        expect(parsed.key).toBe(testKey);
        expect(parsed.val).toBe(testValue);
        done();
      });
    });
  });
});