import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("error event emission", () => {
  const testFile = path.join(__dirname, "test-error.dirty");
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit 'error' event with proper event name when file read fails", (done) => {
    // Create a directory with the same name as the file to trigger an error
    fs.mkdirSync(testFile);

    db = new Dirty(testFile);

    db.on("error", (err) => {
      expect(err).toBeInstanceOf(Error);
      done();
    });

    // Clean up the directory to allow the test to complete
    setImmediate(() => {
      rimraf.sync(testFile);
    });
  });
});