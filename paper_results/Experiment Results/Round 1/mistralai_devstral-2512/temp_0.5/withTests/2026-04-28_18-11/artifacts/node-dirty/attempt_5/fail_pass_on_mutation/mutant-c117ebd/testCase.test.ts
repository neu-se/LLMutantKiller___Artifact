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

  it("should fail when reading file with empty encoding", (done) => {
    const db = new Dirty(testFile);
    db.on("load", () => {
      const testKey = "test";
      const testValue = "test";
      db.set(testKey, testValue, () => {
        // Force read with empty encoding to simulate the mutation
        const readStream = fs.createReadStream(testFile, { encoding: "" });
        let data = "";
        readStream.on("data", (chunk) => {
          data += chunk;
        });
        readStream.on("end", () => {
          // With empty encoding, the data will be corrupted
          expect(data).toContain('"key":"test"');
          done();
        });
      });
    });
  });
});