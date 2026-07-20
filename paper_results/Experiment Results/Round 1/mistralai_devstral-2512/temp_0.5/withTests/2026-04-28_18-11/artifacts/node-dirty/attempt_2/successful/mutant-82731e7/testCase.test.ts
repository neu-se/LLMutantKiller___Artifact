import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("close method behavior with write stream", () => {
  const testFile = path.join(__dirname, "test-close-stream.dirty");
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should not close write stream when _writeStream is null", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Manually set _writeStream to null to simulate the condition
      (db as any)._writeStream = null;

      // Verify write stream is null before close
      expect((db as any)._writeStream).toBeNull();

      // Close should not attempt to end/destroy a null stream
      db.close();

      // In original code, this passes because the condition checks for _writeStream
      // In mutated code, this fails because it tries to call methods on null
      setImmediate(() => {
        done();
      });
    });
  });
});