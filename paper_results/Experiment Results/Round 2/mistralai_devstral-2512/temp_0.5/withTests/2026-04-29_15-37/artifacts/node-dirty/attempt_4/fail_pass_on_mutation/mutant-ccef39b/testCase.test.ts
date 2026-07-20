import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("close behavior with queue and in-flight writes", () => {
  const testFile = path.join(__dirname, "test-close-mutant.dirty");
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should wait for drain when closing with both queue items and in-flight writes", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      // Add first item to create in-flight write
      db.set("key1", "value1", () => {
        // Add second item to queue while first is still in flight
        db.set("key2", "value2");

        // Close should wait for drain because we have both queue items AND in-flight writes
        db.close();

        // This should be called in original code (OR condition)
        // but NOT in mutated code (AND condition)
        db.once("drain", () => {
          done();
        });
      });
    });
  });
});