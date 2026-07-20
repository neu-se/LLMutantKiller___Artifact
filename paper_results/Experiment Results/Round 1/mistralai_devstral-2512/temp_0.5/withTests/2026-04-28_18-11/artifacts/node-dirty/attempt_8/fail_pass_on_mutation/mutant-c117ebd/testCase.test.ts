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

  it("should correctly write UTF-8 encoded data to file", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      const testKey = "test";
      const testValue = "test";
      db.set(testKey, testValue, () => {
        // Read the raw file buffer
        const buffer = fs.readFileSync(testFile);
        // Verify the buffer contains valid UTF-8 encoded JSON
        // The first character should be '{' (0x7B in UTF-8)
        expect(buffer[0]).toBe(0x7B);
        // The file should not be empty
        expect(buffer.length).toBeGreaterThan(0);
        done();
      });
    });
  });
});