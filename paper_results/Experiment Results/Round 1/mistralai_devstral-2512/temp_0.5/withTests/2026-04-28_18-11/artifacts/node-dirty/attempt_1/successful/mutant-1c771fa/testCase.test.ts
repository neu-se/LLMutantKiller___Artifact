import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("test-corrupted-row-error-handling", () => {
  const testFile = path.join(__dirname, "test-corrupted.dirty");
  let errorEmitted = false;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit error when encountering corrupted row during load", (done) => {
    // Create a file with a corrupted row
    fs.writeFileSync(testFile, '{"key":"valid","val":"data"}\ncorrupted row\n{"key":"another","val":"entry"}\n');

    const db = new Dirty(testFile);
    db.on("error", (err) => {
      errorEmitted = true;
      expect(err.message).toContain("Could not load corrupted row");
      done();
    });

    db.on("load", () => {
      if (!errorEmitted) {
        done(new Error("Expected error event to be emitted for corrupted row"));
      }
    });
  });
});