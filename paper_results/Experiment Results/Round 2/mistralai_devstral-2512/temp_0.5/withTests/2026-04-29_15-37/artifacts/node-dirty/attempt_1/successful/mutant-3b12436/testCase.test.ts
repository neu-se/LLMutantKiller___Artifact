import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("dirty database row validation", () => {
  const testFile = path.join(__dirname, "test-corrupted-row.dirty");
  let db: Dirty;

  afterAll(() => {
    rimraf.sync(testFile);
  });

  it("should emit error when loading a row without a key", (done) => {
    // Create a test file with a corrupted row (missing 'key' field)
    const corruptedRow = '{"val":"some value"}\n';
    fs.writeFileSync(testFile, corruptedRow, "utf-8");

    db = new Dirty(testFile);
    db.on("error", (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain("Could not load corrupted row");
      done();
    });
  });
});