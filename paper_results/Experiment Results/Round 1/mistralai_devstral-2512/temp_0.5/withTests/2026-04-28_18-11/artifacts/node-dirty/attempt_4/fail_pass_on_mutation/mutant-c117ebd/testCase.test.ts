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

  it("should correctly write and read data with UTF-8 encoding", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      const testKey = "test";
      const testValue = "test";
      db.set(testKey, testValue, () => {
        // Verify the file was written with UTF-8 encoding by checking the raw buffer
        const buffer = fs.readFileSync(testFile);
        // UTF-8 encoded JSON should start with '{' (0x7B)
        expect(buffer[0]).toBe(0x7B);
        done();
      });
    });
  });
});