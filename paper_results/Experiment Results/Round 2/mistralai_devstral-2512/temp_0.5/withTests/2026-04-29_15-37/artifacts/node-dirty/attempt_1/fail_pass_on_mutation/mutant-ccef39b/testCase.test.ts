import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("close behavior with pending writes", () => {
  const testFile = path.join(__dirname, "test-close.dirty");
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit write_close when closing with pending writes in queue but no in-flight writes", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Add multiple items to the queue
      db.set("key1", "value1");
      db.set("key2", "value2");

      // Force the queue to have items but no in-flight writes
      // by immediately calling close before writes complete
      setImmediate(() => {
        db.close();
      });

      db.on("write_close", () => {
        done();
      });
    });
  });
});