import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("close behavior with in-flight writes", () => {
  const testFile = path.join(__dirname, "test-close-inflight.dirty");
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should wait for drain when closing with in-flight writes", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Add an item that will create an in-flight write
      db.set("key1", "value1", () => {
        // At this point we have an in-flight write
        // Now close - should wait for drain
        db.close();
      });

      // This should be called because we have in-flight writes
      db.once("drain", () => {
        done();
      });
    });
  });
});