import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("close method behavior", () => {
  const testFile = path.join(__dirname, "test-close.dirty");
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should not close write stream when there are no pending operations", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Verify write stream exists
      expect((db as any)._writeStream).not.toBeNull();

      // Close the database
      db.close();

      // The write stream should still exist because there are no pending operations
      // and the mutation would incorrectly close it
      setImmediate(() => {
        expect((db as any)._writeStream).not.toBeNull();
        done();
      });
    });
  });
});