import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

describe("drain event emission test", () => {
  const testFile = path.join(__dirname, "test-drain.dirty");
  let db: Dirty;
  let drainEventCount = 0;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it("should emit 'drain' event with correct event name when writes complete", (done) => {
    db = new Dirty(testFile);
    db.on("load", () => {
      db.set("key1", "value1");
      db.set("key2", "value2");

      db.on("drain", () => {
        drainEventCount++;
      });

      setTimeout(() => {
        expect(drainEventCount).toBeGreaterThan(0);
        done();
      }, 100);
    });
  });
});