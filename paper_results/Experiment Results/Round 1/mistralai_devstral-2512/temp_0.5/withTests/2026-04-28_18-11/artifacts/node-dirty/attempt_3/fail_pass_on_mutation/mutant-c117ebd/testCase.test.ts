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

  it("should correctly handle non-ASCII characters with UTF-8 encoding", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      // Use a string with non-ASCII characters that would fail with empty encoding
      const testKey = "test";
      const testValue = "café";
      db.set(testKey, testValue, () => {
        // Read the raw file contents
        const rawContents = fs.readFileSync(testFile);
        // Verify it's valid UTF-8 by successfully decoding it
        const decoded = rawContents.toString('utf-8');
        expect(() => JSON.parse(decoded.trim())).not.toThrow();
        done();
      });
    });
  });
});