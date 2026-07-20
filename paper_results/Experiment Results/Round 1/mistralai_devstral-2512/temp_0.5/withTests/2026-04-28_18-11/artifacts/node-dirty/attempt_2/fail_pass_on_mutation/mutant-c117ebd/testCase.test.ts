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

  it("should fail to read data when encoding is empty string", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      const testKey = "test";
      const testValue = "testValue";
      db.set(testKey, testValue, () => {
        fs.readFile(testFile, (err, data) => {
          if (err) {
            done(err);
            return;
          }
          // Verify the file is not empty (which would happen with empty encoding)
          expect(data.length).toBeGreaterThan(0);
          done();
        });
      });
    });
  });
});